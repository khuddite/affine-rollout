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

export const RolloutsTable = () => {
  const { data: rolloutPages } = useSuspenseInfiniteRollouts();

  const rollouts = useMemo(() => {
    return rolloutPages?.pages.flatMap((page) => page.rollouts) ?? [];
  }, [rolloutPages]);

  console.log("rollouts: ", rollouts);
  const columns = useMemo<ColumnDef<Rollout>[]>(
    () => [
      {
        header: "No.",
        accessorKey: "id",
        cell: ({ row }) => {
          return <div>{row.original.id}</div>;
        },
      },
      {
        header: "UID",
        accessorKey: "uid",
        cell: ({ row }) => {
          return <div>{row.original.uid}</div>;
        },
      },
      {
        header: "Hotkey",
        accessorKey: "hotkey",
        cell: ({ row }) => {
          return <div>{row.original.hotkey}</div>;
        },
      },
      {
        header: "Model",
        accessorKey: "model",
        cell: ({ row }) => {
          return <div>{row.original.model}</div>;
        },
      },
      {
        header: "Revision",
        accessorKey: "revision",
        cell: ({ row }) => {
          return <div>{row.original.revision}</div>;
        },
      },
      {
        header: "Block",
        accessorKey: "block",
        cell: ({ row }) => {
          return <div>{row.original.block}</div>;
        },
      },
      {
        header: "Response",
        accessorKey: "response",
        cell: ({ row }) => {
          return <p className="line-clamp-2">{row.original.response}</p>;
        },
      },
      {
        header: "Error",
        accessorKey: "error",
        cell: ({ row }) => {
          return <p className="line-clamp-2">{row.original.error}</p>;
        },
      },
      {
        header: "Success",
        accessorKey: "success",
        cell: ({ row }) => {
          return <div>{row.original.success ? "Yes" : "No"}</div>;
        },
      },
      {
        header: "Score",
        accessorKey: "score",
        cell: ({ row }) => {
          return <div>{row.original.score}</div>;
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
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(
                  (
                    header // map over the headerGroup headers array
                  ) => (
                    <th key={header.id} colSpan={header.colSpan}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
