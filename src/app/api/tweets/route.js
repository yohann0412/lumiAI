import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "tweets.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const { tweets } = JSON.parse(fileContents);

    return NextResponse.json(tweets);
  } catch (error) {
    console.error("Error loading tweets:", error);
    return NextResponse.json({ error: "Failed to load tweets" }, { status: 500 });
  }
}

