"use server";

import { storage } from "@/lib/firebase/firebase-admin";
import { getDownloadURL } from "firebase-admin/storage";
import { File as StorageFile } from "@google-cloud/storage";

export const fetchMediaFromStorage = async (
  storageFolder: string,
): Promise<string[]> => {
  try {
    const [files] = await storage
      .bucket()
      .getFiles({ prefix: `${storageFolder}/`, delimiter: "/" })
      .catch((error) => {
        console.error(error);
        throw new Error(`Error retrieving files from ${storageFolder} folder`);
      });

    //this is done to filter out the element that is the folder path itself which doesn't return media
    const media = files.filter((file) => !file.name.endsWith("/"));

    //get all urls from media returned from getFiles()
    const mediaUrls: string[] = await Promise.all(
      media.map(async (item) => await getDownloadURL(item)),
    ).catch((error) => {
      console.error(error);
      throw new Error("Could not retrieve download URLs");
    });

    return mediaUrls;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred fetching photos",
    );
  }
};

const uploadSingleFile = async (
  file: File,
  storageFolder: string,
): Promise<StorageFile> => {
  try {
    // getting storage bucket
    const bucket = storage.bucket();
    const filename = `${storageFolder}/${file.name}`;

    // creating file reference
    const fileRef = bucket.file(filename);

    // firebase-admin requires file to be converted to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fileRef
      .save(buffer, {
        metadata: {
          contentType: file.type,
        },
      })
      .catch((error) => {
        console.error(error);
        throw new Error(`Could not save file ${filename}`);
      });

    await fileRef.makePublic();

    return fileRef;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to upload flyer to storage",
    );
  }
};

export const getFlyerUrl = async (
  file: File,
  storageFolder: string,
): Promise<string> => {
  try {
    const fileRef = await uploadSingleFile(file, storageFolder);
    const flyerUrl = await getDownloadURL(fileRef);

    return flyerUrl;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to upload flyer to storage",
    );
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

export const checkIfStorageFolderExists = async (storageFolder: string) => {
  const [files] = await storage
    .bucket()
    .getFiles({ prefix: `${storageFolder}/`, maxResults: 1 });

  return files.length > 0;
};

export const deleteStorageFolder = async (
  storageFolder: string,
): Promise<boolean> => {
  try {
    if (storageFolder === "") {
      throw new Error("A storage folder was not provided");
    }

    const storageFolderExists = await checkIfStorageFolderExists(storageFolder);
    if (storageFolderExists) {
      await storage
        .bucket()
        .deleteFiles({ prefix: `${storageFolder}/` })
        .catch((error) => {
          console.log(error);
          throw new Error(`Could not delete ${storageFolder} from storage.`);
        });

      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : `An unexpected error occurred deleting the ${storageFolder} folder`,
    );
  }
};
