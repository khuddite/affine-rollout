import {
  keepPreviousData,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAverageScore,
  getRolloutMetrics,
  getRollouts,
  getRolloutsByModel,
} from "../api/rollouts";
import {
  AverageScore,
  RolloutByModel,
  RolloutMetricsResponse,
  RolloutParams,
  RolloutResponse,
} from "../api/rollouts.type";

export const ROLLOUTS_LIMIT = 15;
export const ROLLOUTS_QK = "rollouts";
export const ROLLOUTS_METRICS_QK = "rollouts-metrics";
export const ROLLOUTS_BY_MODEL_QK = "rollouts-by-model";
export const ROLLOUTS_AVERAGE_SCORE_QK = "rollouts-average-score";

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

export const useSuspenseAverageScore = () => {
  return useSuspenseQuery<Array<AverageScore>>({
    queryKey: [ROLLOUTS_AVERAGE_SCORE_QK],
    queryFn: () => getAverageScore(),
  });
};
