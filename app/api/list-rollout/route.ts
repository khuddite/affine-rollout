// app/api/list-rollout/route.ts
import { listFilesFromR2 } from "@/app/lib/list-rollout-files";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rolloutFiles = await listFilesFromR2();
    return NextResponse.json({ success: true, data: rolloutFiles });
  } catch (error) {
    console.error("Error listing rollouts:", error);
    return NextResponse.json(
      { error: "Failed to list rollouts" },
      { status: 500 }
    );
  }
}
