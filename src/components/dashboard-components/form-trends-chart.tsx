"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FormTrendData } from "@/lib/types/dashboard";

interface FormTrendsChartProps {
  data: FormTrendData[];
}

const FormTrendsChart: React.FC<FormTrendsChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    date: item.date,
    huawei: item.huawei_count,
    kahoot: item.kahoot_count,
  }));

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <span className="text-slate-800 dark:text-slate-200">
              Form Creation Trends
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Monthly form creation trends
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 min-h-0">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-slate-600 dark:text-slate-400"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-slate-600 dark:text-slate-400"
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
                labelStyle={{ color: "#374151" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="huawei"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3B82F6" }}
                activeDot={{ r: 6, fill: "#3B82F6" }}
                name="Huawei Forms"
              />
              <Line
                type="monotone"
                dataKey="kahoot"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10B981" }}
                activeDot={{ r: 6, fill: "#10B981" }}
                name="Kahoot Forms"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormTrendsChart;
