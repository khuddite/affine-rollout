"use client";

import React from "react";
import {
  useSuspenseRolloutMetrics,
  useSuspenseRolloutsByModel,
} from "../hooks/use-rollouts";
import { RolloutMetricsCard } from "./rollout-metrics-card";
import { RolloutCountChart } from "./rollout-count-chart";

export const RolloutMetrics = () => {
  const { data: rolloutMetrics } = useSuspenseRolloutMetrics();
  const { data: rolloutsByModel } = useSuspenseRolloutsByModel();

  const rolloutsByModelKeys = rolloutsByModel.map((rollout) => rollout.model);
  const rolloutsByModelChartData = rolloutsByModel.reduce((acc, rollout) => {
    acc[rollout.model] = rollout.count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <RolloutMetricsCard
        value={rolloutMetrics.uniqueBlocks}
        title="Unique Blocks"
      />
      <RolloutMetricsCard
        value={rolloutMetrics.uniqueUIDs}
        title="Unique Miners"
      />
      <RolloutMetricsCard
        value={rolloutMetrics.uniqueModels}
        title="Unique Models"
      />
      <RolloutMetricsCard
        value={rolloutMetrics.uniqueHotkeys}
        title="Unique Hotkeys"
      />
      <RolloutMetricsCard
        value={rolloutMetrics.successCount}
        title="Success Count"
      />
      <RolloutMetricsCard
        value={rolloutMetrics.errorCount}
        title="Error Count"
      />

      <div className="w-full border border-gray-200 p-2 flex flex-col gap-4">
        <RolloutCountChart
          data={{
            ...rolloutsByModelChartData,
            name: "Samples By Model",
          }}
          keys={rolloutsByModelKeys}
        />
      </div>
    </div>
  );
};
