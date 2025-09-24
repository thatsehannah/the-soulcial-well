import { db } from "@/lib/firebase/firebase-admin";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const snapshot = await db
      .collection("experiences")
      .where("upcoming", "==", "true")
      .get();

    if (snapshot.empty) {
      return NextResponse.json(false);
    }

    return NextResponse.json(true);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error checking for upcoming experiences", error.stack);
    } else {
      console.log(error);
    }

    return NextResponse.json(
      {
        error: "Failed to check for upcoming experiences ",
      },
      { status: 500 }
    );
  }
};
