"use client";
import React, { useMemo } from "react";
import { useSuspenseInfiniteRollouts } from "../hooks/use-rollouts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Rollout } from "../api/rollouts.type";
import { Typography } from "../components/typography";

export const RolloutsTable = () => {
  const { data: rolloutPages } = useSuspenseInfiniteRollouts();

  const rollouts = useMemo(() => {
    return rolloutPages?.pages.flatMap((page) => page.rollouts) ?? [];
  }, [rolloutPages]);

  console.log("rollouts: ", rollouts);
  const columns = useMemo<ColumnDef<Rollout>[]>(
    () => [
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            No.
          </Typography.DMMonoSmall>
        ),
        accessorKey: "id",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.id}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            UID
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
            Hotkey
          </Typography.DMMonoSmall>
        ),
        accessorKey: "hotkey",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.hotkey}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Model
          </Typography.DMMonoSmall>
        ),
        accessorKey: "model",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.model}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Revision
          </Typography.DMMonoSmall>
        ),
        accessorKey: "revision",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.revision}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Block
          </Typography.DMMonoSmall>
        ),
        accessorKey: "block",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.block}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Response
          </Typography.DMMonoSmall>
        ),
        accessorKey: "response",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="line-clamp-2 text-center">
              {row.original.response}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Error
          </Typography.DMMonoSmall>
        ),
        accessorKey: "error",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="line-clamp-2 text-center">
              {row.original.error}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Success
          </Typography.DMMonoSmall>
        ),
        accessorKey: "success",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.success ? "Yes" : "No"}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            Score
          </Typography.DMMonoSmall>
        ),
        accessorKey: "score",
        cell: ({ row }) => {
          return (
            <Typography.ParagraphHafferSmall className="text-center">
              {row.original.score}
            </Typography.ParagraphHafferSmall>
          );
        },
      },
    ],
    []
  );
  const table = useReactTable({
    data: rollouts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-[50%] border-collapse border border-gray-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id} className="h-12">
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
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="h-12 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
