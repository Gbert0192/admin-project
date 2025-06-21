import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioCardsDemoProps {
  options: RadioOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const RadioCardsDemo: React.FC<RadioCardsDemoProps> = ({
  options,
  defaultValue,
  onValueChange,
}) => {
  const initialValue =
    defaultValue || (options.length > 0 ? options[0].value : undefined);

  return (
    <div>
      <RadioGroup.Root
        defaultValue={initialValue}
        onValueChange={onValueChange}
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
      >
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className="relative bg-white/40 backdrop-blur-md border border-black/30 hover:border-black/30 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500/20"
          >
            <RadioGroup.Indicator className="absolute top-2 right-2 h-3 w-3 bg-green-500 rounded-full" />

            <span className="text-sm font-semibold text-gray-700 data-[state=checked]:text-black transition-colors duration-300">
              {option.label}
            </span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default RadioCardsDemo;
