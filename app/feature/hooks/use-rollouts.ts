import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getRollouts } from "../api/rollouts";
import { RolloutParams, RolloutResponse } from "../api/rollouts.type";

export const ROLLOUTS_LIMIT = 10;
export const ROLLOUTS_QK = "rollouts";

export const useSuspenseRollouts = (params: RolloutParams) => {
  return useSuspenseQuery<RolloutResponse>({
    queryKey: [ROLLOUTS_QK, params],
    queryFn: () => getRollouts(params),
  });
};
