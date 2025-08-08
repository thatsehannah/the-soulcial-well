import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/firebase";

export const getImagesFromStorage = async (bucket: string) => {
  const folderRef = ref(storage, bucket);

  const allImageFiles = await listAll(folderRef);

  const urlPromises = allImageFiles.items.map((itemRef) =>
    getDownloadURL(itemRef)
  ); //this returns an array of promises
  const allUrls = Promise.all(urlPromises);

  return allUrls;
};
