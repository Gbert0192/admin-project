"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart3 } from "lucide-react";

interface DataItem {
  name: string;
  responses: number;
}

interface RangkingChartProps {
  data: DataItem[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "blue",
  },
} satisfies ChartConfig;

export function RangkingChart({ data }: RangkingChartProps) {
  return (
    <Card className="w-full max-w-4xl h-[50vh] border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-slate-800 dark:text-slate-200">
              Class Rankings
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
              Performance by class
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow min-h-0">
        <div className="w-full h-full min-h-0 flex flex-col">
          <ChartContainer config={chartConfig} className="flex-grow min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={data}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value}
                />
                <YAxis
                  tickCount={10}
                  domain={[0, "dataMax"]}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="responses" fill="blue" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
