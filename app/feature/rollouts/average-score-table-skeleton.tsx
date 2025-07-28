import React from "react";
import { Typography } from "../components/typography";

const TableRowSkeleton = () => {
  return (
    <tr className="h-10">
      {[1, 2, 3, 4].map((i) => (
        <td key={i} className="px-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-16" />
        </td>
      ))}
    </tr>
  );
};

const TableHeader = () => {
  return (
    <tr className="h-10">
      <th className="bg-gray-900 text-gray-300 min-w-16 px-4">
        <Typography.DMMonoSmall className="uppercase">#</Typography.DMMonoSmall>
      </th>
      <th className="bg-gray-900 text-gray-300 min-w-16 px-4">
        <Typography.DMMonoSmall className="uppercase">
          Miner UID
        </Typography.DMMonoSmall>
      </th>
      <th className="bg-gray-900 text-gray-300 min-w-16 px-4">
        <Typography.DMMonoSmall className="uppercase">
          Count
        </Typography.DMMonoSmall>
      </th>
      <th className="bg-gray-900 text-gray-300 min-w-16 px-4">
        <Typography.DMMonoSmall className="uppercase">
          Average Score
        </Typography.DMMonoSmall>
      </th>
    </tr>
  );
};

export const AverageScoreTableSkeleton = () => {
  return (
    <table className="w-full">
      <thead>
        <TableHeader />
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TableRowSkeleton key={i} />
        ))}
      </tbody>
    </table>
  );
};
