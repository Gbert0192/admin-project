"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
interface SelectFormProps<
  TFieldValues extends FieldValues,
  TOption extends object,
> {
  formName: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder: string;
  options: TOption[];
  valueKey: keyof TOption;
  labelKey: keyof TOption;
  className?: string;
}

export const SelectForm = <
  TFieldValues extends FieldValues,
  TOption extends object,
>({
  formName,
  control,
  placeholder,
  options = [],
  valueKey,
  labelKey,
  className,
}: SelectFormProps<TFieldValues, TOption>) => {
  return (
    <Controller
      name={formName}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={options.length === 0}
          >
            <SelectTrigger className={cn(className)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem
                  key={`${String(option[valueKey])}-${index}`}
                  value={String(option[valueKey])}
                >
                  {String(option[labelKey])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <p className="pt-1 text-xs text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};
