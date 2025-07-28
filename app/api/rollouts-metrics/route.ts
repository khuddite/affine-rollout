// app/api/rollouts/stats/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [uniqueBlocks, uniqueUIDs, uniqueModels, uniqueHotkeys] =
      await Promise.all([
        prisma.rollout.findMany({
          select: { block: true },
          distinct: ["block"],
        }),
        prisma.rollout.findMany({ select: { uid: true }, distinct: ["uid"] }),
        prisma.rollout.findMany({
          select: { model: true },
          distinct: ["model"],
        }),
        prisma.rollout.findMany({
          select: { hotkey: true },
          distinct: ["hotkey"],
        }),
      ]);

    const [successCount, errorCount] = await Promise.all([
      prisma.rollout.count({ where: { success: true } }),
      prisma.rollout.count({ where: { error: { not: null } } }),
    ]);

    return NextResponse.json({
      uniqueBlocks: uniqueBlocks.length,
      uniqueUIDs: uniqueUIDs.length,
      uniqueModels: uniqueModels.length,
      uniqueHotkeys: uniqueHotkeys.length,
      successCount,
      errorCount,
    });
  } catch (error) {
    console.error("Failed to fetch rollout stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
