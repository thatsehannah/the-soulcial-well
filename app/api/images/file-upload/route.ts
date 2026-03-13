import { storage } from "@/lib/firebase/firebase-admin";
import { ApiResponse } from "@/utils/types";
import { getDownloadURL } from "firebase-admin/storage";
import { NextRequest, NextResponse } from "next/server";

// TODO: move this [storageFolder] api route
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const folder = data.get("folder") as string;
    const isUploadingFlyer = data.get("isUploadingFlyer");

    // getting storage bucket
    const bucket = storage.bucket();
    const filename = `${folder}/${file.name}`;

    // creating file reference
    const fileRef = bucket.file(filename);

    // firebase-admin requires file to be converted to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    await fileRef.makePublic();

    if (isUploadingFlyer) {
      const flyerUrl = await getDownloadURL(fileRef);

      return NextResponse.json(
        {
          flyerUrl,
        },
        { status: 201 },
      );
    }

    return NextResponse.json<ApiResponse>(
      { message: "File uploaded successfully" },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error uploading file: ", error);
    return NextResponse.json<ApiResponse>(
      {
        message: "Error uploading file",
      },
      { status: 500 },
    );
  }
};
