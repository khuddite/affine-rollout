import {
  keepPreviousData,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getRolloutMetrics,
  getRollouts,
  getRolloutsByModel,
} from "../api/rollouts";
import {
  RolloutByModel,
  RolloutMetricsResponse,
  RolloutParams,
  RolloutResponse,
} from "../api/rollouts.type";

export const ROLLOUTS_LIMIT = 15;
export const ROLLOUTS_QK = "rollouts";
export const ROLLOUTS_METRICS_QK = "rollouts-metrics";
export const ROLLOUTS_BY_MODEL_QK = "rollouts-by-model";

export const useRollouts = (params: RolloutParams) => {
  return useQuery<RolloutResponse>({
    queryKey: [ROLLOUTS_QK, params],
    queryFn: () => getRollouts(params),
    placeholderData: keepPreviousData,
  });
};

export const useSuspenseRolloutMetrics = () => {
  return useSuspenseQuery<RolloutMetricsResponse>({
    queryKey: [ROLLOUTS_METRICS_QK],
    queryFn: () => getRolloutMetrics(),
  });
};

export const useSuspenseRolloutsByModel = () => {
  return useSuspenseQuery<RolloutByModel[]>({
    queryKey: [ROLLOUTS_BY_MODEL_QK],
    queryFn: () => getRolloutsByModel(),
  });
};
