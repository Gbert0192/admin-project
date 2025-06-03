"use client";

import type {
  DataTableFilterableColumn,
  DataTableFilterOption,
  DataTableSearchableColumn,
} from "@/types";
import type { Table } from "@tanstack/react-table";
import * as React from "react";

import { DataTableAdvancedFilter } from "@/components/data-table/DataTableAdvancedFilter";
import { DataTableFacetedFilter } from "@/components/data-table/DataTableFacetedFilter";
import { DataTableViewOptions } from "@/components/data-table/DataTableViewOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { DataTableAdvancedFilterItem } from "./DataTableAdvancedFilterItem";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
  advancedFilter?: boolean;
  toolbarExtraAction?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  advancedFilter = false,
  toolbarExtraAction,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedOptions, setSelectedOptions] = React.useState<DataTableFilterOption<TData>[]>([]);
  const [advancedFilterMenuOpen, setAdvancedFilterMenuOpen] = React.useState(false);

  return (
    <div className="w-full space-y-2.5 overflow-auto p-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {advancedFilter && (
            <div className="flex w-full flex-wrap gap-2">
              {selectedOptions.map(selectedOption => (
                <DataTableAdvancedFilterItem
                  key={String(selectedOption.value)}
                  table={table}
                  selectedOption={selectedOption}
                  setSelectedOptions={setSelectedOptions}
                  advancedFilterMenuOpen={advancedFilterMenuOpen}
                  setAdvancedFilterMenuOpen={setAdvancedFilterMenuOpen}
                />
              ))}
              <DataTableAdvancedFilter
                searchableColumns={searchableColumns}
                filterableColumns={filterableColumns}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                advancedFilterMenuOpen={advancedFilterMenuOpen}
                setAdvancedFilterMenuOpen={setAdvancedFilterMenuOpen}
                isSwitchable={false}
              />
            </div>
          )}
          {!advancedFilter &&
            searchableColumns.length > 0 &&
            searchableColumns.map(
              column =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ""}
                    onChange={event =>
                      table.getColumn(String(column.id))?.setFilterValue(event.target.value)
                    }
                    className="min-w-[150px] max-w-sm"
                  />
                ),
            )}
          {!advancedFilter &&
            filterableColumns.length > 0 &&
            filterableColumns.map(
              column =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    column={table.getColumn(column.id ? String(column.id) : "")}
                    title={column.title}
                    options={column.options}
                  />
                ),
            )}
          {!advancedFilter && isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {toolbarExtraAction}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      {/* {advancedFilter && advancedFilterMenuOpen ? (
        <div className="flex items-center space-x-2 bg-red-800">
          {selectedOptions.map(selectedOption => (
            <DataTableAdvancedFilterItem
              key={String(selectedOption.value)}
              table={table}
              selectedOption={selectedOption}
              setSelectedOptions={setSelectedOptions}
              advancedFilterMenuOpen={advancedFilterMenuOpen}
              setAdvancedFilterMenuOpen={setAdvancedFilterMenuOpen}
            />
          ))}
          <DataTableAdvancedFilter
            searchableColumns={searchableColumns}
            filterableColumns={filterableColumns}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            advancedFilterMenuOpen={advancedFilterMenuOpen}
            setAdvancedFilterMenuOpen={setAdvancedFilterMenuOpen}
            isSwitchable={false}
          />
        </div>
      ) : null} */}
    </div>
  );
}
