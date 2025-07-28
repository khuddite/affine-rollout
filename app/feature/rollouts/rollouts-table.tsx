"use client";
import React, { useMemo, useState } from "react";
import { ROLLOUTS_LIMIT, useSuspenseRollouts } from "../hooks/use-rollouts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Rollout } from "../api/rollouts.type";
import { Typography } from "../components/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const RolloutsTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: ROLLOUTS_LIMIT, //default page size
  });
  const {
    data: {
      rollouts,
      pagination: { totalRollouts },
    },
  } = useSuspenseRollouts({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  console.log("rollouts: ", rollouts);

  const columns = useMemo<ColumnDef<Rollout>[]>(
    () => [
      {
        header: () => (
          <Typography.DMMonoSmall className="uppercase">
            #
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
            <Typography.ParagraphHafferSmall className="text-center line-clamp-1">
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
            <Typography.ParagraphHafferSmall className="line-clamp-1 text-center">
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
            <Typography.ParagraphHafferSmall className="line-clamp-1 text-center">
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
    manualPagination: true,
    rowCount: totalRollouts,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="flex-1 overflow-auto">
        <table>
          <thead>
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="h-10 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
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
      </div>
      <div className="flex items-center px-4 my-2">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
