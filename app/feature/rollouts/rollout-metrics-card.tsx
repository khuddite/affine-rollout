import React from "react";
import { Typography } from "../components/typography";

interface RolloutMetricsCardProps {
  title: string;
  value: number;
}

export const RolloutMetricsCard = ({
  title,
  value,
}: RolloutMetricsCardProps) => {
  return (
    <div className="w-full border border-gray-200 p-2 flex flex-col gap-4">
      <Typography.ParagraphHaffer>{value}</Typography.ParagraphHaffer>
      <Typography.DMMonoSmall>{title}</Typography.DMMonoSmall>
    </div>
  );
};
