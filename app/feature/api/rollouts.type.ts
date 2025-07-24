import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface RolloutParams {
  page: number;
  limit: number;
  success?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export interface RolloutResponse {
  rollouts: Rollout[];
  pagination: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    page: number;
    totalPages: number;
    totalRollouts: number;
  };
  filters: {
    sortBy: string;
    sortOrder: string;
    success: boolean | null;
  };
}

export interface Rollout {
  id: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
  hotkey: string;
  model: string;
  revision?: string;
  block: number;
  response?: string;
  error?: string;
  success: boolean;
  score?: number;
}
