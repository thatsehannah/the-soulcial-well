//these functions will be called on the server

import { db } from "@/lib/firebase/firebase-admin";
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
      const { date } = doc.data();
      const transformedDate = date.toDate() as Date;

      const {
        description,
        flyerUrl,
        linkToRsvp,
        storageFolder,
        title,
        upcoming,
        upcomingDescription,
        location,
      } = doc.data() as ExperienceItem;

      return {
        description,
        flyerUrl,
        linkToRsvp,
        storageFolder,
        title,
        upcoming,
        upcomingDescription,
        location,
        date: transformedDate,
      };
    });

    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw new Error("Failed to fetch experiences");
  }
};
