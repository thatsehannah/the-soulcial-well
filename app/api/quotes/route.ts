import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await fetch("https://zenquotes.io/api/quotes/", {
    next: { revalidate: 86400 },
  });
  const data = await response.json();

  return NextResponse.json(data[0].q);
};
