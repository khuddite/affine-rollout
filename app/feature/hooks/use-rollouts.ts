import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getRollouts } from "../api/rollouts";
import { RolloutParams, RolloutResponse } from "../api/rollouts.type";

export const ROLLOUTS_LIMIT = 20;
export const ROLLOUTS_QK = "rollouts";

export const useSuspenseInfiniteRollouts = () => {
  return useSuspenseInfiniteQuery<
    RolloutResponse,
    Error,
    InfiniteData<RolloutResponse>,
    QueryKey,
    RolloutParams
  >({
    queryKey: [ROLLOUTS_QK],
    queryFn: ({ pageParam }) => getRollouts(pageParam),
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage.pagination.hasNextPage) {
        return undefined;
      }

      return {
        ...lastPageParam,
        page: lastPageParam.page + 1,
      };
    },
    initialPageParam: {
      page: 1,
      limit: ROLLOUTS_LIMIT,
    },
  });
};
