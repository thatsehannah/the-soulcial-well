import { storage } from "@/lib/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const folder = data.get("folder") as string;
    const isUploadingFlyer = data.get("isUploadingFlyer") as string;

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
      // getting public url
      const flyerUrl = fileRef.publicUrl();

      return NextResponse.json({
        flyerUrl,
      });
    }

    return NextResponse.json({
      status: 201,
    });
  } catch (error) {
    console.error("Error uploading flyer: ", error);
    throw new Error("Failed to upload flyer");
  }
};
