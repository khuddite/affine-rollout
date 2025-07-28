export const dynamic = "force-dynamic"; // This disables SSG and ISR

import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ROLLOUTS_LIMIT, ROLLOUTS_QK } from "./feature/hooks/use-rollouts";
import { getRollouts } from "./feature/api/rollouts";
import { RolloutsTable } from "./feature/rollouts/rollouts-table";
import { Typography } from "./feature/components/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-50 py-6 px-4 flex flex-col">
      <div className="mb-4 border-b-[1px] border-gray-200 pb-2 flex justify-between w-full items-center">
        <div>
          <Typography.DMMonoHeading2 className="uppercase font-bold">
            Affine Foundation
          </Typography.DMMonoHeading2>
          <Typography.ParagraphHaffer className="text-gray-400">
            We will mine reasoning for the world.
          </Typography.ParagraphHaffer>
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
              {/* <RolloutsTable /> */}
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:overflow-hidden h-auto lg:h-full">
              <div className="w-full flex flex-col border border-gray-200">
                <RolloutsTable />
              </div>
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}
