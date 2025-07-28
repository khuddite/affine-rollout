import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const grouped = await prisma.rollout.groupBy({
      by: ["uid"],
      _avg: {
        score: true,
      },
      _count: {
        score: true,
      },
      where: {
        score: {
          not: null,
        },
      },
    });

    const formatted = grouped.map((item) => ({
      uid: item.uid,
      avgScore: item._avg.score,
      count: item._count.score,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("[API] Error calculating score stats:", error);
    return NextResponse.json(
      { error: "Failed to calculate score stats" },
      { status: 500 }
    );
  }
}
