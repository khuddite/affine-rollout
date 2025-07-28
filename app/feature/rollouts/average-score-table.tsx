"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useSuspenseAverageScore } from "../hooks/use-rollouts";
import { Typography } from "../components/typography";
import { AverageScore } from "../api/rollouts.type";

export const AverageScoreTable = () => {
  const { data: averageScore } = useSuspenseAverageScore();

  const columns = useMemo<ColumnDef<AverageScore>[]>(
    () => [
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            #
          </Typography.DMMonoSmall>
        ),
        accessorKey: "index",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.index + 1}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Miner UID
          </Typography.DMMonoSmall>
        ),
        accessorKey: "uid",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.uid}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Count
          </Typography.DMMonoSmall>
        ),
        accessorKey: "count",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.count}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Average Score
          </Typography.DMMonoSmall>
        ),
        accessorKey: "avgScore",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {Intl.NumberFormat("en-US", {
                maximumFractionDigits: 3,
              }).format(row.original.avgScore)}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: averageScore,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: averageScore.length,
  });

  return (
    <table className="w-full">
      <thead className="sticky top-0">
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id} className="h-10">
              {headerGroup.headers.map(
                (
                  header // map over the headerGroup headers array
                ) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="bg-gray-900 text-gray-300 min-w-16"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                )
              )}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="h-10">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
