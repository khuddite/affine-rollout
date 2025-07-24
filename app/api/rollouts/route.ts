import { Prisma } from "@/lib/generated/prisma-client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// Validate sort parameters
const validSortFields = ["id", "createdAt", "uid", "block", "score"];
const validSortOrders = ["asc", "desc"];

const isValidSortField = (
  field: string
): field is keyof Prisma.RolloutOrderByWithRelationInput => {
  return validSortFields.includes(field);
};

const isValidSortOrder = (order: string): order is Prisma.SortOrder => {
  return validSortOrders.includes(order);
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const success = url.searchParams.get("success"); // filter by success status
  const sortBy = url.searchParams.get("sortBy") || "id";
  const sortOrder = url.searchParams.get("sortOrder") || "asc";
  const offset = (page - 1) * limit;

  // Validate pagination parameters
  if (page < 1 || limit < 1 || limit > 100) {
    return NextResponse.json(
      { error: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  if (!isValidSortField(sortBy)) {
    return NextResponse.json(
      { error: "Invalid sortBy parameter" },
      { status: 400 }
    );
  }

  if (!isValidSortOrder(sortOrder)) {
    return NextResponse.json(
      { error: "Invalid sortOrder parameter" },
      { status: 400 }
    );
  }

  try {
    // Build where clause for filtering
    const where: Prisma.RolloutWhereInput = {};
    if (success !== null) {
      where.success = success === "true";
    }

    // Build orderBy clause
    const orderBy: Prisma.RolloutOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    // Fetch paginated rollouts
    const rollouts = await prisma.rollout.findMany({
      skip: offset,
      take: limit,
      where,
      orderBy,
    });

    // Get total count for pagination
    const totalRollouts = await prisma.rollout.count({ where });
    const totalPages = Math.ceil(totalRollouts / limit);

    return NextResponse.json({
      rollouts,
      pagination: {
        page,
        limit,
        totalPages,
        totalRollouts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        success: success !== null ? success === "true" : null,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("Error fetching rollouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch rollouts" },
      { status: 500 }
    );
  }
}
