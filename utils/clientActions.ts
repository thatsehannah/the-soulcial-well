//these functions will be called on the client

import { ApiResult, ExperienceItem } from "./types";

export const fetchPhotosFromStorage = async (
  folder: string,
): Promise<ApiResult<string[]>> => {
  try {
    const response = await fetch(`/api/images/${folder}`);

    const result = (await response.json()) as ApiResult;

    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred fetching photos",
    };
  }
};

export const checkForUpcomingExperiences = async (): Promise<
  ApiResult<boolean>
> => {
  try {
    const response = await fetch("/api/experiences/upcoming");

    const result = (await response.json()) as ApiResult;

    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred checking for upcoming experiences",
    };
  }
};

export const getFlyerUrl = async (
  file: File,
  folder: string,
): Promise<ApiResult<string>> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("isUploadingFlyer", "true");

    const response = await fetch("/api/images/file-upload", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as ApiResult;

    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error
          ? error.message
          : "Failed to upload image to storage",
    };
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

// TODO: make this a trycatch block
const uploadSingleFile = async (file: File, storageFolder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", storageFolder);

  const response = await fetch("/api/images/file-upload", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const result = (await response.json()) as ApiResult;
    return result.successMessage;
  }
};

export const createNewExperience = async (
  data: ExperienceItem,
): Promise<ApiResult<null>> => {
  try {
    const response = await fetch("/api/experiences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as ApiResult;
    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const fetchExperiences = async (): Promise<
  ApiResult<ExperienceItem[]>
> => {
  try {
    const response = await fetch("/api/experiences");

    const result = (await response.json()) as ApiResult;
    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error ? error.message : "Error fetching experiences",
    };
  }
};

export const updateExperience = async (
  data: Partial<ExperienceItem>,
): Promise<ApiResult> => {
  try {
    const response = await fetch("/api/experiences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as ApiResult;
    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.error(error);
    return {
      errorMessage:
        error instanceof Error ? error.message : "An unxepcted error occurred.",
    };
  }
};

export const deleteExperience = async (storageFolder: string) => {
  try {
    const response = await fetch("/api/experiences", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storageFolder),
    });

    const result = (await response.json()) as ApiResult;

    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred deleting this experience",
    };
  }
};

export const deleteStorageFolder = async (
  folder: string,
): Promise<ApiResult> => {
  try {
    const response = await fetch(`/api/images/${folder}`, {
      method: "DELETE",
    });

    const result = (await response.json()) as ApiResult;

    if (response.ok) {
      return result;
    }

    throw new Error(result.errorMessage);
  } catch (error) {
    console.log(error);
    return {
      errorMessage:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred deleting this folder",
    };
  }
};
