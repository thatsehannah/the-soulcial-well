import { type ExperienceItem } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

type CreateExperienceResponse = {
  message: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const data: ExperienceItem = await req.json();
    console.log(data);

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
