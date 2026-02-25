import { ExperienceItem } from "@/utils/types";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = req.body as unknown as ExperienceItem;
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
