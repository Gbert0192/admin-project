/* eslint-disable no-shadow */
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Type } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

const DataTableSearchBar = ({
  table,
  noShowView,
  searchableColumns,
  advancedFilter = false,
  toolbarExtraAction,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const searchParams = useSearchParams();
  const keys = Array.from(searchParams.keys());

  useEffect(() => {
    if (keys.length > 0) {
      const defaultSelectedColumns = [];
      keys.forEach(key => {
        const columns = searchableColumns.find(item => item.id === key);
        if (columns) defaultSelectedColumns.push(columns);
      });
      if (defaultSelectedColumns.length > 0) {
        setSelectedOptions(defaultSelectedColumns);
      }
    }
  }, []);

  return (
    <div className="mt-1 flex w-full flex-wrap items-center justify-between gap-2 px-1 md:flex-nowrap">
      {advancedFilter ? (
        <div className="flex flex-wrap items-center gap-2 md:flex-1">
          {selectedOptions.map(op => (
            <FilterItem key={op.id} selectedOptions={op} setSelectedOptions={setSelectedOptions} />
          ))}
          <FilterOptions
            options={searchableColumns}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
      ) : (
        <div className="md:flex-1" />
      )}
      <div className="flex items-center justify-end gap-2">
        <div className="w-fit">{toolbarExtraAction}</div>
        {noShowView && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
};

export default DataTableSearchBar;

const FilterOptions = ({ options, selectedOptions, setSelectedOptions }) => {
  const [open, setOpen] = useState(false);
  return (
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
          {options.filter(option => !selectedOptions.find(item => item.id === option.id)).length <
          1 ? (
            <p className="py-6 text-center text-sm">Nothing Found</p>
          ) : (
            <CommandEmpty>Nothing Found</CommandEmpty>
          )}

          <CommandGroup>
            <ScrollArea className="max-h-[60vh] overflow-y-scroll">
              {options
                .filter(option => !selectedOptions.find(item => item.id === option.id))
                .map(option => (
                  <CommandItem
                    key={String(option.id)}
                    className="capitalize"
                    value={String(option.id.split("_").join(" "))}
                    onSelect={currentValue => {
                      setOpen(false);
                      setSelectedOptions(prev => {
                        if (currentValue === prev.id) {
                          return prev.filter(item => item.id !== currentValue);
                        }
                        return [...prev, option];
                      });
                    }}
                  >
                    <Type className="mr-2 h-4 w-4" aria-hidden="true" />
                    {option.title}
                  </CommandItem>
                ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FilterItem = ({ selectedOptions, setSelectedOptions }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(searchParams.get(selectedOptions.id) || "");
  const debounceValue = useDebounce(value, 500);

  const createQueryString = useCallback(
    params => {
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
    [searchParams],
  );

  useEffect(() => {
    if (debounceValue.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOptions.id]: `${debounceValue}`,
          page: 1,
        })}`,
        {
          scroll: false,
        },
      );
    }

    if (debounceValue.length === 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOptions.id]: null,
        })}`,
        {
          scroll: false,
        },
      );
    }
  }, [debounceValue]);

  function specialCase(special) {
    if (special === "month") {
      return (
        <Input
          className="h-8"
          value={value}
          type="month"
          max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`}
          onChange={event => setValue(event.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              setOpen(false);
            }
          }}
          autoFocus
        />
      );
    }
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className={cn("truncate rounded-full mt-1")}
        >
          {value?.length > 0 ? (
            <span className="ml-1">
              {selectedOptions.title} :{" "}
              {selectedOptions?.options?.length > 0
                ? selectedOptions?.options.find(op => op?.value === value)?.label
                : value}
            </span>
          ) : (
            <span className="capitalize">{selectedOptions?.title}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 space-y-1 text-xs" align="start">
        <div className="flex items-center space-x-1">
          <div className="flex flex-1 items-center space-x-1">
            <div className="font-medium capitalize">{selectedOptions.title}</div>
          </div>
          <Button
            aria-label="Remove filter"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              router.push(
                `${pathname}?${createQueryString({
                  [selectedOptions.id]: null,
                })}`,
                {
                  scroll: false,
                },
              );
              setSelectedOptions(prev => prev.filter(item => item.id !== selectedOptions.id));
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        {selectedOptions?.special ? (
          specialCase(selectedOptions?.special)
        ) : selectedOptions?.options?.length > 0 ? (
          <Select
            value={value}
            onValueChange={val => {
              setValue(val);
              setOpen(false);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectedOptions.options.map(op => (
                  <SelectItem key={op?.value} value={op?.value}>
                    {op?.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <Input
            placeholder="Type here..."
            className="h-8"
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                setOpen(false);
              }
            }}
            autoFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
