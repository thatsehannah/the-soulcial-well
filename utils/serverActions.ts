//these functions will be called on the server

import { db } from "@/lib/firebase/firebase-admin";
import { type ExperienceItem } from "./types";

export const fetchAllExperiences = async (): Promise<ExperienceItem[]> => {
  try {
    const snapshot = await db.collection("experiences").get();

    if (snapshot.empty) {
      return [];
    }

    const experiences = snapshot.docs.map((doc) => {
      const {
        description,
        flyerUrl,
        linkToRsvp,
        storageFolder,
        title,
        upcoming,
        upcomingDescription,
      } = doc.data() as ExperienceItem;

      return {
        description,
        flyerUrl,
        linkToRsvp,
        storageFolder,
        title,
        upcoming,
        upcomingDescription,
      };
    });

    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw new Error("Failed to fetch experiences");
  }
};
