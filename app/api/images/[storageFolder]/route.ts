import { storage } from "@/lib/firebase/firebase-admin";
import { ApiResponse } from "@/utils/types";
import { getDownloadURL } from "firebase-admin/storage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
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

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ storageFolder: string }> },
) => {
  try {
    const { storageFolder } = await params;

    const data = await req.formData();
    const file = data.get("file") as File;
    const isUploadingFlyer = data.get("isUploadingFlyer");

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

    if (isUploadingFlyer) {
      const flyerUrl = await getDownloadURL(fileRef);

      return NextResponse.json<ApiResponse<string>>(
        {
          data: flyerUrl,
        },
        { status: 201 },
      );
    }

    return NextResponse.json<ApiResponse<string>>(
      {
        successMessage: "File uploaded successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error ? error.message : "Error uploading file",
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ storageFolder: string }> },
) => {
  try {
    const { storageFolder } = await params;
    if (storageFolder === "") {
      throw new Error("A storage folder was not provided");
    }

    const [file] = await storage
      .bucket()
      .getFiles({ prefix: `${storageFolder}/`, maxResults: 1 });
    if (file.length > 0) {
      await storage
        .bucket()
        .deleteFiles({ prefix: `${storageFolder}/` })
        .catch((error) => {
          console.log(error);
          throw new Error(`Could not delete ${storageFolder} from storage.`);
        });

      return NextResponse.json<ApiResponse>(
        {
          successMessage: "Successfully delete storage folder.",
        },
        { status: 200 },
      );
    }

    throw new Error(`${storageFolder} does not exist.`);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error ? error.message : "Failed to deletes images",
      },
      { status: 500 },
    );
  }
};
