// app/api/rollouts/by-model/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma-client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rolloutsPerModel = await prisma.rollout.groupBy({
      by: ["model"],
      _count: { model: true },
      orderBy: { _count: { model: "desc" } },
    });

    return NextResponse.json(
      rolloutsPerModel.map((entry) => ({
        model: entry.model,
        count: entry._count.model,
      }))
    );
  } catch (error) {
    console.error("Error fetching rollouts per model:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
