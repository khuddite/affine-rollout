// app/api/sync-rollout/route.ts
import { NextResponse } from "next/server";
import { syncFromR2ToDB } from "@/app/lib/sync-rollout";

export async function GET() {
  try {
    await syncFromR2ToDB(); // your sync function
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
