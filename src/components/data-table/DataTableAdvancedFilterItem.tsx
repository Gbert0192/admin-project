/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */

"use client";

import type { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import type { DataTableFilterOption } from "@/types";
import { Trash2 } from "lucide-react";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";

interface DataTableAdvancedFilterItemProps<TData> {
  table: Table<TData>;
  selectedOption: DataTableFilterOption<TData>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<DataTableFilterOption<TData>[]>>;
  advancedFilterMenuOpen: boolean;
  setAdvancedFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTableAdvancedFilterItem<TData>({
  table,
  selectedOption,
  setSelectedOptions,
}: DataTableAdvancedFilterItemProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState("");
  const debounceValue = useDebounce(value, 500);
  const [open, setOpen] = React.useState(true);

  const selectedValues =
    selectedOption.items.length > 0
      ? Array.from(
          new Set(table.getColumn(String(selectedOption.value))?.getFilterValue() as string[]),
        )
      : [];

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  React.useEffect(() => {
    if (debounceValue.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOption.value]: `${debounceValue}`,
        })}`,
        {
          scroll: false,
        },
      );
    }

    if (debounceValue.length === 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOption.value]: null,
        })}`,
        {
          scroll: false,
        },
      );
    }
  }, [debounceValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className={cn(
            "truncate rounded-full",
            (selectedValues.length > 0 || value.length > 0) && "bg-muted/50",
          )}
        >
          {value.length > 0 || selectedValues.length > 0 ? (
            <>
              <span className="font-medium capitalize">{selectedOption.label}:</span>
              {selectedValues.length > 0 ? (
                <span className="ml-1">
                  {selectedValues.length > 2
                    ? `${selectedValues.length} selected`
                    : selectedValues.join(", ")}
                </span>
              ) : (
                <span className="ml-1">{value}</span>
              )}
            </>
          ) : (
            <span className="capitalize">{selectedOption.label}</span>
          )}
        </Button>
      </PopoverTrigger>
      {selectedOption.isMultiple ? (
        <PopoverContent className="w-80 space-y-1 text-xs" align="start">
          <div className="flex items-center space-x-1">
            <div className="flex flex-1 items-center space-x-1">
              Where
              <DynamicFilter
                table={table}
                selectedOption={selectedOption}
                value={value}
                setValue={setValue}
              />
            </div>
            <Button
              aria-label="Remove filter"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                router.push(
                  `${pathname}?${createQueryString({
                    [selectedOption.value]: null,
                  })}`,
                  {
                    scroll: false,
                  },
                );
                setSelectedOptions(prev =>
                  prev.filter(item => item.value !== selectedOption.value),
                );
              }}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <DynamicFilter
            table={table}
            selectedOption={selectedOption}
            value={value}
            setValue={setValue}
          />
        </PopoverContent>
      ) : (
        <PopoverContent className="w-60 space-y-1 text-xs" align="start">
          <div className="flex items-center space-x-1">
            <div className="flex flex-1 items-center space-x-1">
              <div className="font-medium capitalize">{selectedOption.label}</div>
            </div>
            <Button
              aria-label="Remove filter"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                router.push(
                  `${pathname}?${createQueryString({
                    [selectedOption.value]: null,
                  })}`,
                  {
                    scroll: false,
                  },
                );
                setSelectedOptions(prev =>
                  prev.filter(item => item.value !== selectedOption.value),
                );
              }}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <DynamicFilter
            table={table}
            selectedOption={selectedOption}
            value={value}
            setValue={setValue}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}

interface DynamicFilterProps<TData> {
  table: Table<TData>;
  selectedOption: DataTableFilterOption<TData>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function DynamicFilter<TData>({
  table,
  selectedOption,
  value,
  setValue,
}: DynamicFilterProps<TData>) {
  if (selectedOption.items.length > 0) {
    return (
      table.getColumn(selectedOption.value ? String(selectedOption.value) : "") && (
        <DataTableFacetedFilter
          key={String(selectedOption.value)}
          column={table.getColumn(selectedOption.value ? String(selectedOption.value) : "")}
          title={selectedOption.label}
          options={selectedOption.items}
          variant="command"
        />
      )
    );
  }

  return (
    <Input
      placeholder="Type here..."
      className="h-8"
      value={value}
      onChange={event => setValue(event.target.value)}
      autoFocus
    />
  );
}
