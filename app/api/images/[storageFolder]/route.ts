import { storage } from "@/lib/firebase/firebase-admin";
import { ApiResponse } from "@/utils/types";
import { getDownloadURL } from "firebase-admin/storage";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ storageFolder: string }> },
) => {
  try {
    const { storageFolder } = await params;

    const [files] = await storage
      .bucket()
      .getFiles({ prefix: `${storageFolder}/`, delimiter: "/" })
      .catch((error) => {
        console.error(error);
        throw new Error(`Error retrieving files from ${storageFolder} folder`);
      });

    //this is done to filter out the element that is the folder path itself which doesn't return an image
    const images = files.filter((file) => !file.name.endsWith("/"));

    //get all urls from images returned from getFiles()
    const imageUrls: string[] = await Promise.all(
      images.map(async (image) => await getDownloadURL(image)),
    ).catch((error) => {
      console.error(error);
      throw new Error("Could not retrieve download URLs");
    });

    return NextResponse.json<ApiResponse>({ data: imageUrls }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error ? error.message : "Failed to fetch images",
      },
      { status: 500 },
    );
  }
};
