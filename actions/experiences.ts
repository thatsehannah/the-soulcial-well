"use server";

import { db } from "@/lib/firebase/firebase-admin";
import { ExperienceItem } from "@/utils/types";
import { revalidateTag, unstable_cache } from "next/cache";

export const fetchExperiences = unstable_cache(
  async (): Promise<ExperienceItem[]> => {
    try {
      console.log("Fetching experiences...");
      const snapshot = await db
        .collection("experiences")
        .orderBy("date", "desc")
        .get();

      if (snapshot.empty) {
        return [];
      }

      const experiences = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          description: data.description,
          flyerUrl: data.flyerUrl,
          linkToRsvp: data.linkToRsvp,
          storageFolder: data.storageFolder,
          title: data.title,
          upcoming: data.upcoming,
          upcomingDescription: data.upcomingDescription,
          location: data.location,
          date: data.date?.toDate() as Date,
        } as ExperienceItem;
      });

      return experiences;
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error occurred fetching experiences",
      );
    }
  },
  ["all-experiences"],
  {
    tags: ["all-experiences"],
  },
);

export const checkForUpcomingExperiences = unstable_cache(
  async (): Promise<boolean> => {
    try {
      const snapshot = await db
        .collection("experiences")
        .where("upcoming", "==", true)
        .get();

      if (!snapshot) {
        throw new Error("Could not locate the 'experiences' collection");
      }

      if (snapshot.empty) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred checking for upcoming experiences",
      );
    }
  },
  ["upcoming-experiences"],
  {
    tags: ["upcoming-experiences"],
  },
);

export const createNewExperience = async (
  data: ExperienceItem,
): Promise<boolean> => {
  try {
    // docId and the storage folder will always be the same name. it's also guaranteed that the storageFolder property will have a value
    const docId = data.storageFolder!;
    const docRef = db.collection("experiences").doc(docId);

    const result = await docRef.set(data).catch((error) => {
      console.error(error);
      throw new Error("Error creating this document");
    });

    if (result.writeTime) {
      console.log(result.writeTime);
      revalidateTag("upcoming-experiences");
      revalidateTag("all-experiences");
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred",
    );
  }
};

export const updateExperience = async (
  data: Partial<ExperienceItem>,
): Promise<boolean> => {
  try {
    const docId = data.storageFolder!;
    const docRef = db.collection("experiences").doc(docId);

    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error("Could not locate existing doc");
    }

    const result = await docRef.update(data).catch((error) => {
      console.error(error);
      throw new Error("Error updating this document");
    });

    if (result.writeTime) {
      revalidateTag("upcoming-experiences");
      revalidateTag("all-experiences");
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "An unxepcted error occurred.",
    );
  }
};

export const deleteExperience = async (docId: string): Promise<boolean> => {
  try {
    const docRef = db.collection("experiences").doc(docId);

    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error("Could not locate document");
    }

    const result = await docRef.delete().catch((error) => {
      console.error(error);
      throw new Error("Error deleting this document");
    });

    if (result.writeTime) {
      revalidateTag("upcoming-experiences");
      revalidateTag("all-experiences");
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred deleting this experience",
    );
  }
};
