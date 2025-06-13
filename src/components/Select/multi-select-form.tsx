"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useId } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Primitive = string | number;

interface MultiSelectFormProps<
  TFieldValues extends FieldValues,
  TOption extends object & { [key: string]: any },
> {
  formName: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder: string;
  options: TOption[];
  valueKey: {
    [K in keyof TOption]: TOption[K] extends Primitive ? K : never;
  }[keyof TOption];
  labelKey: keyof TOption;
}

export const MultiSelectForm = <
  TFieldValues extends FieldValues,
  TOption extends object & { [key: string]: any },
>({
  formName,
  control,
  placeholder,
  options = [],
  valueKey,
  labelKey,
}: MultiSelectFormProps<TFieldValues, TOption>) => {
  const [open, setOpen] = useState(false);
  const componentId = useId();

  type ValueType = TOption[typeof valueKey];

  return (
    <Controller
      name={formName}
      control={control}
      defaultValue={[] as any}
      render={({ field }) => {
        const selectedValues = (
          Array.isArray(field.value) ? field.value : []
        ) as ValueType[];

        const toggleSelection = (value: ValueType) => {
          const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
          field.onChange(newSelectedValues);
        };

        const removeSelection = (value: ValueType) => {
          field.onChange(selectedValues.filter((v) => v !== value));
        };

        const selectedOptions = options.filter((option) =>
          selectedValues.includes(option[valueKey])
        );

        return (
          <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedValues.length > 0
                    ? `Choosed ${selectedValues.length} ${selectedValues.length > 1 ? "Item(s)" : "Item"}`
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Cari..." />
                  <CommandList>
                    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-48">
                        {options.map((option) => (
                          <CommandItem
                            key={`${componentId}-${option[valueKey]}`}
                            value={String(option[labelKey])}
                            onSelect={() => toggleSelection(option[valueKey])}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedValues.includes(option[valueKey])
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {String(option[labelKey])}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex min-h-[2.5rem] flex-wrap gap-2 rounded-md border p-2">
              {selectedOptions.map((option) => (
                <Badge
                  key={`${componentId}-badge-${option[valueKey]}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {String(option[labelKey])}
                  <button
                    type="button"
                    aria-label={`Remove ${String(option[labelKey])}`}
                    onClick={() => removeSelection(option[valueKey])}
                    className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};
