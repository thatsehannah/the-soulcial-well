//these functions will be called on the client

import { ExperienceItem } from "./types";

export const fetchPhotosFromStorage = async (
  folder: string,
): Promise<string[]> => {
  try {
    const response = await fetch(`/api/images/${folder}`);

    if (response.ok) {
      return (await response.json()) as string[];
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log(`Error fetching photos from ${folder}:`, error);
    throw new Error(`Failed to fetch images from ${folder}`);
  }
};

export const checkForUpcomingExperiences = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/experiences/upcoming");

    if (response.ok) {
      return (await response.json()) as boolean;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log(`Error checking for upcoming experiences from API: ${error}`);
    throw new Error(`Failed to check for upcoming experiences from API`);
  }
};

export const getFlyerUrl = async (
  file: File,
  folder: string,
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("flyer", file);
    formData.append("folder", folder);

    const response = await fetch("/api/images/flyer-upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return (await response.json()) as string;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log(`Error uploading flyer to storage from API: ${error}`);
    throw new Error(`Failed to upload image to storage`);
  }
};

export const createNewExperience = async (data: ExperienceItem) => {
  try {
    const response = await fetch("/api/experiences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return (await response.json()) as string;
    }
  } catch (error) {
    console.log(error);
  }
};
