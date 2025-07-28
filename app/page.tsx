export const dynamic = "force-dynamic"; // This disables SSG and ISR

import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ROLLOUTS_LIMIT, ROLLOUTS_QK } from "./feature/hooks/use-rollouts";
import { getRollouts } from "./feature/api/rollouts";
import { RolloutsTable } from "./feature/rollouts/rollouts-table";
import { Typography } from "./feature/components/typography";

export default function Home() {
  const queryClient = getQueryClient();

  const prefetchParams = {
    page: 1,
    limit: ROLLOUTS_LIMIT,
  };

  queryClient.prefetchQuery({
    queryKey: [ROLLOUTS_QK, prefetchParams],
    queryFn: () => getRollouts(prefetchParams),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <Typography.Heading1 className="mb-4">Rollouts Table</Typography.Heading1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RolloutsTable />
      </HydrationBoundary>
    </div>
  );
}
