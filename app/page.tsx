export const dynamic = "force-dynamic"; // This disables SSG and ISR

import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ROLLOUTS_LIMIT, ROLLOUTS_QK } from "./feature/hooks/use-rollouts";
import { getRollouts } from "./feature/api/rollouts";
import { RolloutsTable } from "./feature/rollouts/rollouts-table";

export default function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
    queryKey: [ROLLOUTS_QK],
    queryFn: ({ pageParam }) => getRollouts(pageParam),
    initialPageParam: {
      page: 1,
      limit: ROLLOUTS_LIMIT,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-[#333333]">
        Rollouts Table
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RolloutsTable />
      </HydrationBoundary>
    </div>
  );
}
