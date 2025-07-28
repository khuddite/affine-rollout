export interface RolloutParams {
  page: number;
  limit: number;
  success?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export interface RolloutMetricsResponse {
  uniqueBlocks: number;
  uniqueUIDs: number;
  uniqueModels: number;
  uniqueHotkeys: number;
  successCount: number;
  errorCount: number;
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

export interface RolloutByModel {
  model: string;
  count: number;
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

export interface AverageScore {
  uid: string;
  avgScore: number;
  count: number;
}
