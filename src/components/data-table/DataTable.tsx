"use client";

import type { DataTableSearchableColumn } from "@/types";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  // type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableSearchBar from "./DataTableSearchBar";

type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  hide?: boolean;
};
interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  total: number;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  advancedFilter?: boolean;
  tablePagination?: boolean;
  toolbarExtraAction?: React.ReactNode;
  noShowView?: boolean;
  manualControl?: boolean;
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (row: TData) => void;
  // showToolbar: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  total,
  searchableColumns = [] as DataTableSearchableColumn<TData>[],
  advancedFilter = false,
  tablePagination = true,
  noShowView = true,
  toolbarExtraAction, // showToolbar = true,
  manualControl = false,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const limit = searchParams?.get("limit") ?? "10";
  const perPageAsNumber = Number(limit);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const hideColumnsObject: Record<string, boolean> = {} as Record<
    string,
    boolean
  >;
  columns.forEach((column) => {
    if (column.hide && column.id) {
      hideColumnsObject[column.id] = false;
    }
  });

  // Table states
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(hideColumnsObject);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  React.useEffect(() => {
    setPagination({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });
  }, [fallbackPage, fallbackPerPage]);

  React.useEffect(() => {
    if (!manualControl) {
      router.push(
        `${pathname}?${createQueryString({
          page: pageIndex ? pageIndex + 1 : null,
          limit: pageSize !== 10 ? pageSize : null,
        })}`,
        {
          scroll: false,
        }
      );
    }
  }, [pageIndex, pageSize]);

  // Handle server-side filtering
  // const debouncedSearchableColumnFilters = JSON.parse(
  //   useDebounce(
  //     JSON.stringify(
  //       columnFilters.filter(filter => {
  //         return searchableColumns.find(column => column.id === filter.id);
  //       }),
  //     ),
  //     500,
  //   ),
  // ) as ColumnFiltersState;

  // React.useEffect(() => {
  //   for (const column of debouncedSearchableColumnFilters) {
  //     if (typeof column.value === "string") {
  //       router.push(
  //         `${pathname}?${createQueryString({
  //           [column.id]: typeof column.value === "string" ? column.value : null,
  //         })}`,
  //       );
  //     }
  //   }

  //   const keys = Array.from(searchParams.keys());

  //   for (const key of keys) {
  //     if (
  //       searchableColumns.find(column => column.id === key) &&
  //       !debouncedSearchableColumnFilters.find(column => column.id === key)
  //     ) {
  //       router.push(
  //         `${pathname}?${createQueryString({
  //           page: 1,
  //           [key]: null,
  //         })}`,
  //       );
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(debouncedSearchableColumnFilters)]);

  const dataManual = React.useMemo(() => {
    if (manualControl) {
      const start = pageIndex * pageSize;
      const end = start + pageSize;
      return data?.slice(start, end);
    }
    return data;
  }, [data, pageIndex, pageSize, manualControl]);

  const table = useReactTable({
    data: manualControl ? dataManual : data || [],
    columns,
    // eslint-disable-next-line no-unsafe-optional-chaining
    pageCount: manualControl
      ? Math.ceil(data?.length / pageSize)
      : pageCount || 1,
    state: {
      pagination,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: !manualControl,
    manualFiltering: !manualControl,
  });

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      {/* {showToolbar && (
        <DataTableToolbar
          table={table}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
          advancedFilter={advancedFilter}
          toolbarExtraAction={toolbarExtraAction}
        />
      )} */}
      <DataTableSearchBar
        table={table}
        searchableColumns={searchableColumns}
        advancedFilter={advancedFilter}
        toolbarExtraAction={toolbarExtraAction}
        noShowView={noShowView}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows &&
            table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      </div>
      {tablePagination && <DataTablePagination table={table} total={total} />}
    </div>
  );
}
