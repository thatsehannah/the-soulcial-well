//these functions will be called on the server
"use server";

import { db, storage } from "@/lib/firebase/firebase-admin";
import { type ExperienceItem } from "./types";

export const fetchAllExperiences = async (): Promise<ExperienceItem[]> => {
  try {
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
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch experiences",
    );
  }
};

export const checkIfStorageFolderExists = async (storageFolder: string) => {
  const [files] = await storage
    .bucket()
    .getFiles({ prefix: `${storageFolder}/`, maxResults: 1 });

  return files.length > 0;
};
