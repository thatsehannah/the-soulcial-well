import { db } from "@/lib/firebase/firebase-admin";
import { type ExperienceItem } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

type CreateExperienceResponse = {
  message: string;
};

export const POST = async (req: NextRequest) => {
  try {
    let data: ExperienceItem = await req.json();
    const formattedDate = new Date(data.date);
    data = {
      ...data,
      date: formattedDate,
    };
    console.log(data);

    // docId and the storage folder will always be the same name. it's also guaranteed that the storageFolder property will have a value
    const docId = data.storageFolder!;
    const docRef = db.collection("experiences").doc(docId);

    await docRef.set(data);

    console.log(`The ${docId} has been successfully created`);

    return NextResponse.json<CreateExperienceResponse>(
      {
        message: `${data.title} experience has been created successfully`,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json<CreateExperienceResponse>(
        {
          message: "Failed to create experience",
        },
        { status: 500 },
      );
    }
  }
};
