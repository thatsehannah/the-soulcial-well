import { db } from "@/lib/firebase/firebase-admin";
import { fetchAllExperiences } from "@/utils/serverActions";
import { ApiResponse, type ExperienceItem } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const experiences = await fetchAllExperiences();

    return NextResponse.json<ApiResponse<ExperienceItem[]>>(
      { data: experiences },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error
            ? error.message
            : "Failed to fetch all experiences.",
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    let data: ExperienceItem = await req.json();
    const formattedDate = new Date(data.date);
    data = {
      ...data,
      date: formattedDate,
    };

    // docId and the storage folder will always be the same name. it's also guaranteed that the storageFolder property will have a value
    const docId = data.storageFolder!;
    const docRef = db.collection("experiences").doc(docId);

    await docRef.set(data).catch((error) => {
      console.error(error);
      throw new Error("Error created this document");
    });

    return NextResponse.json<ApiResponse>(
      {
        successMessage: "Experience has been created successfully.",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error
            ? error.message
            : "Failed to create experience",
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    let data: Partial<ExperienceItem> = await req.json();

    if (data.date) {
      const formattedDate = new Date(data.date!);
      data = {
        ...data,
        date: formattedDate,
      };
    }

    const docId = data.storageFolder!;
    const docRef = db.collection("experiences").doc(docId);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json<ApiResponse>(
        {
          errorMessage: "Could not locate existing doc",
        },
        {
          status: 404,
        },
      );
    }

    await docRef.update(data).catch((error) => {
      console.log(error);
      throw new Error("Error updating this document");
    });

    return NextResponse.json<ApiResponse>(
      {
        successMessage: "Experience has been updated successfully.",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error
            ? error.message
            : "Failed to update experience",
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const docId = (await req.json()) as string;
    console.log(docId);
    const docRef = db.collection("experiences").doc(docId);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json<ApiResponse>(
        {
          errorMessage: "Could not locate document",
        },
        {
          status: 404,
        },
      );
    }

    await docRef.delete().catch((error) => {
      console.error(error);
      throw new Error("Error deleting this document");
    });

    return NextResponse.json<ApiResponse>(
      {
        successMessage: "Experience has been deleted successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error
            ? error.message
            : "Failed to delete experience",
      },
      { status: 500 },
    );
  }
};
