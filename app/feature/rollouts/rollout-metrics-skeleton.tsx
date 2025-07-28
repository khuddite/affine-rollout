import React from "react";

const RolloutMetricsCardSkeleton = () => {
  return (
    <div className="w-full border border-gray-200 p-2 flex flex-col gap-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
    </div>
  );
};

const RolloutCountChartSkeleton = () => {
  return (
    <div className="w-full border border-gray-200 p-2 flex flex-col gap-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-2 gap-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-full" />
        </div>

        {/* Chart skeleton */}
        <div className="h-20 bg-gray-200 rounded animate-pulse mb-4" />

        {/* Legend skeleton */}
        <div className="flex-col justify-center gap-6 text-sm">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 pb-1">
              <div className="w-2 h-2 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RolloutMetricsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <RolloutMetricsCardSkeleton />
      <RolloutMetricsCardSkeleton />
      <RolloutMetricsCardSkeleton />
      <RolloutMetricsCardSkeleton />
      <RolloutMetricsCardSkeleton />
      <RolloutMetricsCardSkeleton />
      <RolloutCountChartSkeleton />
    </div>
  );
};
