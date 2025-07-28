export const dynamic = "force-dynamic"; // This disables SSG and ISR

import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  ROLLOUTS_AVERAGE_SCORE_QK,
  ROLLOUTS_BY_MODEL_QK,
  ROLLOUTS_LIMIT,
  ROLLOUTS_METRICS_QK,
  ROLLOUTS_QK,
} from "./feature/hooks/use-rollouts";
import {
  getAverageScore,
  getRolloutMetrics,
  getRollouts,
  getRolloutsByModel,
} from "./feature/api/rollouts";
import { RolloutsTable } from "./feature/rollouts/rollouts-table";
import { Typography } from "./feature/components/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RolloutMetrics } from "./feature/rollouts";
import { Suspense } from "react";
import { RolloutMetricsSkeleton } from "./feature/rollouts/rollout-metrics-skeleton";
import { AverageScoreTable } from "./feature/rollouts/average-score-table";
import { AverageScoreTableSkeleton } from "./feature/rollouts/average-score-table-skeleton";

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

  queryClient.prefetchQuery({
    queryKey: [ROLLOUTS_METRICS_QK],
    queryFn: () => getRolloutMetrics(),
  });

  queryClient.prefetchQuery({
    queryKey: [ROLLOUTS_BY_MODEL_QK],
    queryFn: () => getRolloutsByModel(),
  });

  queryClient.prefetchQuery({
    queryKey: [ROLLOUTS_AVERAGE_SCORE_QK],
    queryFn: () => getAverageScore(),
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div className="mb-2 border-b-[1px] border-gray-200 py-2 flex justify-between w-full items-center sticky top-0 bg-gray-50 z-40">
        <div>
          <Typography.DMMonoHeading3 className="uppercase font-bold">
            Affine Foundation
          </Typography.DMMonoHeading3>
          <Typography.ParagraphHafferSmall className="text-gray-400">
            We will mine reasoning for the world.
          </Typography.ParagraphHafferSmall>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="link" size="icon">
            <Link href="https://x.com/affineofficial" target="_blank">
              <Image src="/icons/x.svg" alt="X" width={24} height={24} />
            </Link>
          </Button>
          <Button variant="link" size="icon">
            <Link
              href="https://github.com/AffineFoundation/affine"
              target="_blank"
            >
              <Image
                src="/icons/github.svg"
                alt="Github"
                width={24}
                height={24}
              />
            </Link>
          </Button>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-grow lg:overflow-hidden relative flex-1">
          <div className="flex flex-col-reverse lg:flex-row w-full flex-grow lg:gap-2 ">
            <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:overflow-auto h-auto lg:h-full">
              <Suspense fallback={<RolloutMetricsSkeleton />}>
                <RolloutMetrics />
              </Suspense>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:overflow-hidden h-auto lg:h-full">
              <div className="w-full flex flex-col border border-gray-200 max-h-[50vh]">
                <RolloutsTable />
              </div>
              <div className="w-full border border-gray-200 flex overflow-auto max-h-[calc(50vh-126px)]">
                <Suspense fallback={<AverageScoreTableSkeleton />}>
                  <AverageScoreTable />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}
