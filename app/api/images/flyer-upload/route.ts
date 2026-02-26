import { storage } from "@/lib/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export type FlyerUploadRequest = {
  flyerFile: unknown;
  storageBucket: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const flyer = data.get("flyer") as File;
    console.log("flyer name: ", flyer.name);
    const folder = data.get("folder") as string;

    // getting storage bucket
    const bucket = storage.bucket();
    const filename = `${folder}/${flyer.name}`;
    console.log("Filename: ", filename);

    // creating file reference
    const fileRef = bucket.file(filename);

    // firebase-admin requires file to be converted to a buffer
    const arrayBuffer = await flyer.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fileRef.save(buffer, {
      metadata: {
        contentType: flyer.type,
      },
    });

    await fileRef.makePublic();

    // getting public url
    const flyerUrl = fileRef.publicUrl();
    console.log("Flyer url");

    return NextResponse.json({
      flyerUrl,
    });
  } catch (error) {
    console.error("Error uploading flyer: ", error);
    throw new Error("Failed to upload flyer");
  }
};
