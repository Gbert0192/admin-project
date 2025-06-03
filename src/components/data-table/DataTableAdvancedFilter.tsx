/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

"use client";

import type {
  DataTableFilterableColumn,
  DataTableFilterOption,
  DataTableSearchableColumn,
} from "@/types";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowUpDown, ChevronDown, Plus, Type } from "lucide-react";

interface DataTableAdvancedFilterProps<TData> {
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  selectedOptions: DataTableFilterOption<TData>[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<DataTableFilterOption<TData>[]>>;
  advancedFilterMenuOpen: boolean;
  setAdvancedFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSwitchable?: boolean;
}

export function DataTableAdvancedFilter<TData>({
  filterableColumns = [],
  searchableColumns = [],
  selectedOptions,
  setSelectedOptions,
  advancedFilterMenuOpen,
  setAdvancedFilterMenuOpen,
  isSwitchable = false,
}: DataTableAdvancedFilterProps<TData>) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const options: DataTableFilterOption<TData>[] = React.useMemo(() => {
    const searchableOptions = searchableColumns.map(column => ({
      label: column.title,
      value: column.id as keyof TData,
      items: [],
    }));
    const filterableOptions = filterableColumns.map(column => ({
      label: column.title,
      value: column.id as keyof TData,
      items: column.options,
    }));
    return [...searchableOptions, ...filterableOptions];
  }, [searchableColumns, filterableColumns]);

  React.useEffect(() => {
    if (selectedOptions.length === 0) {
      setAdvancedFilterMenuOpen(false);
      setValue("");
    }
  }, [selectedOptions, setAdvancedFilterMenuOpen]);

  return (
    <>
      {isSwitchable ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAdvancedFilterMenuOpen(!advancedFilterMenuOpen)}
        >
          Filter
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" aria-hidden="true" />
        </Button>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" role="combobox" className="rounded-full">
              <Plus className="mr-2 h-4 w-4 opacity-50" aria-hidden="true" />
              Add filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Filter by..." />
              {options.filter(option => !selectedOptions.find(item => item.value === option.value))
                .length < 1 ? (
                <p className="py-6 text-center text-sm">Nothing Found</p>
              ) : (
                <CommandEmpty>Nothing Found</CommandEmpty>
              )}

              <CommandGroup>
                {options
                  .filter(option => !selectedOptions.find(item => item.value === option.value))
                  .map(option => (
                    <CommandItem
                      key={String(option.value)}
                      className="capitalize"
                      value={String(option.value)}
                      onSelect={currentValue => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        setAdvancedFilterMenuOpen(
                          selectedOptions.length > 0 ? true : !advancedFilterMenuOpen,
                        );
                        setSelectedOptions(prev => {
                          if (currentValue === value) {
                            return prev.filter(item => item.value !== option.value);
                          }
                          return [...prev, option];
                        });
                      }}
                    >
                      {option.items.length > 0 ? (
                        <ChevronDown className="mr-2 h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Type className="mr-2 h-4 w-4" aria-hidden="true" />
                      )}
                      {option.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandSeparator />
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
