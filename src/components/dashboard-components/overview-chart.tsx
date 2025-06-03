"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DataItem {
  month: string;
  desktop: number;
}

interface OverviewChartProps {
  data: DataItem[];
}

type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

export const OverviewChart: React.FC<OverviewChartProps> = ({ data }) => {
  const config = {
    desktop: {
      label: "Desktop",
      color: "blue",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full max-w-4xl h-[50dvh] border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <LineChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <span className="text-slate-800 dark:text-slate-200">
              User Registration Trends
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
              Monthly user registration overview
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow min-h-0">
        <div className="w-full h-full min-h-0 flex flex-col">
          <ChartContainer config={config} className="flex-grow min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
