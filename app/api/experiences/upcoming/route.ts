import { db } from "@/lib/firebase/firebase-admin";
import { ApiResponse } from "@/utils/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const snapshot = await db
      .collection("experiences")
      .where("upcoming", "==", true)
      .get();

    if (!snapshot) {
      throw new Error("Could not locate the 'experiences' collection");
    }

    if (snapshot.empty) {
      return NextResponse.json<ApiResponse<boolean>>({ data: false });
    }

    return NextResponse.json<ApiResponse<boolean>>({ data: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse>(
      {
        errorMessage:
          error instanceof Error
            ? error.message
            : "Failed to check for upcoming experiences ",
      },
      { status: 500 },
    );
  }
};
