"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { HeaderSection } from "../_components/header-section";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { differenceInDays } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gallery, GalleryStatus } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDownIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const selectBadgeColor = (days: number) => {
  if(days >= 1 && days <= 10) return "bg  bg-red-600 text-white";
  if(days >= 11 && days <= 20) return "bg  bg-orange-600 text-white";
  if(days > 20) return "bg  bg-green-600 text-white";
  return "bg-2  bg-gray-600 text-white";
}

const columns: ColumnDef<Gallery>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "status",

    cell: ({ row }) => {
      const status = row.original.status;
      if (status === GalleryStatus.PUBLISHED) return;
      return <Badge variant="outline">{status}</Badge>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Status</span>
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "expiresAt",
    cell: ({ row }) => {
      const expiresAt = row.original.expiresAt;
      return expiresAt ? (
        <Badge className={`${selectBadgeColor(differenceInDays(expiresAt, new Date()))}`}>
          {differenceInDays(expiresAt, new Date()) < 0 ? "Expired" : `${differenceInDays(expiresAt, new Date())} días`}
        </Badge>
      ) : (
        <span className={selectBadgeColor(0)}>Sin fecha</span>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Expires in</span>
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isPrivate",
    cell: ({ row }) => {
      const isPrivate = row.original.isPrivate;
      return isPrivate ? "Private" : "Public";
    },
    header: "Visibility",
  },
  {
    accessorKey: "clientName",
    cell: ({ row }) => {
      const clientName = row.original.clientName;
      return clientName ? clientName : "Sin cliente";
    },
    header: "Client",
  },
  {
    accessorKey: "minSelections",
    cell: ({ row }) => {
      const minSelections = row.original.minSelections;
      return minSelections ? minSelections : "Sin selección";
    },
    header: "Min.",
  },

  {
    accessorKey: "maxSelections",
    cell: ({ row }) => {
      const maxSelections = row.original.maxSelections;
      return maxSelections ? maxSelections : "Sin selección";
    },
    header: "Max.",
  },
  {
    accessorKey: "code",
    cell: ({ row }) => {
      const code = row.original.code;
      return code ? code : "Sin código";
    },
    header: "Code",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return createdAt.toLocaleDateString();
    },
    header: "Created at",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost"  className="p-0 m-0 size-5" size="icon">
            <EyeIcon className="size-4" />
          </Button>
          <Button variant="ghost" className="p-0 m-0 size-5" size="icon">
            <PencilIcon className="size-4" />
          </Button>
          <Button variant="ghost" className="p-0 m-0 size-5" size="icon">
            <TrashIcon className="size-4 text-red-500" />
          </Button>
        </div>
      );
    },
    header: "Actions",
  },
];

export default function GalleryPageClient() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const galleries = api.galery.getGaleries.useQuery();

  const table = useReactTable({
    data: galleries.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <HeaderSection
        breadcrumbs={[
          { title: "Galleries", url: "/dashboard/gallery" },
          { title: "All galleries", url: "/dashboard/gallery", isActive: true },
        ]}
      />

      <section className="px-5">
        <div className="flex items-center justify-start space-x-4">
          <h1 className="text-2xl font-bold text-zinc-900">All galleries</h1>
          <Button variant="outline">Add gallery</Button>
        </div>
        <div className="flex items-center gap-4 py-4 border p-5 rounded-lg my-10 mb-5">
          <div className="flex flex-col space-y-2">
            <Label>Filter by code</Label>
            <Input
              placeholder="Filter by code"
              value={
                (table.getColumn("code")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("code")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Filter by gallery name</Label>
            <Input
              placeholder="Filter by gallery name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Filter by gallery CODE</Label>
            <Input
              placeholder="Filter by gallery CODE"
              value={
                (table.getColumn("code")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("code")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

        </div>
        <Table className="w-full border rounded">
          <TableCaption>A list of galleries.</TableCaption>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
