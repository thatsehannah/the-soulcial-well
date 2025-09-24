import { storage } from "@/lib/firebase/firebase-admin";
import { getDownloadURL } from "firebase-admin/storage";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ storageFolder: string }> }
) => {
  try {
    const { storageFolder } = await params;

    const [images] = await storage
      .bucket()
      .getFiles({ prefix: `${storageFolder}/`, delimiter: "/" });

    //get all urls from images returned from getFiles()
    const imageUrls: string[] = await Promise.all(
      images.slice(1).map(async (image) => await getDownloadURL(image))
    );

    return NextResponse.json(imageUrls);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching images", error.stack);
    } else {
      console.log(error);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch images",
      },
      { status: 500 }
    );
  }
};
