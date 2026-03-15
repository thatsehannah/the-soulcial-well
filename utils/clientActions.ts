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
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("isUploadingFlyer", "true");

    const response = await fetch("/api/images/file-upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      return result.flyerUrl;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log(`Error uploading flyer to storage from API: ${error}`);
    throw new Error(`Failed to upload image to storage`);
  }
};

export const uploadFilesInBatches = async (
  files: File[],
  storageFolder: string,
) => {
  const batchSize = 3;
  try {
    const filesToUpload = Array.from(files);
    for (let i = 0; i < filesToUpload.length; i += batchSize) {
      const batch = filesToUpload.slice(i, i + batchSize);
      await Promise.all(
        batch.map((file) => uploadSingleFile(file, storageFolder)),
      );
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error uploading files",
    );
  }
};

const uploadSingleFile = async (file: File, storageFolder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", storageFolder);

  const response = await fetch("/api/images/file-upload", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    return (await response.json()) as string;
  }
};

export const createNewExperience = async (data: ExperienceItem) => {
  try {
    const response = await fetch("/api/experiences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return (await response.json()) as string;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const fetchExperiences = async () => {
  try {
    const response = await fetch("/api/experiences");

    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error fetching experiences",
    );
  }
};

export const updateExperience = async (data: Partial<ExperienceItem>) => {
  try {
    const response = await fetch("/api/experiences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return (await response.json()) as string;
  } catch (error) {
    console.log(error);
    return "";
  }
};
