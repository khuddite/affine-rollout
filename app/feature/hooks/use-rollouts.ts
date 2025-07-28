import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRollouts } from "../api/rollouts";
import { RolloutParams, RolloutResponse } from "../api/rollouts.type";

export const ROLLOUTS_LIMIT = 15;
export const ROLLOUTS_QK = "rollouts";

export const useRollouts = (params: RolloutParams) => {
  return useQuery<RolloutResponse>({
    queryKey: [ROLLOUTS_QK, params],
    queryFn: () => getRollouts(params),
    placeholderData: keepPreviousData,
  });
};
