"use client";

import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { HEADER_GRADIENT_STOPS, SvgLinearGradient } from "@/components/layout/chart-gradients";

const RANGE_OPTIONS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

const revenueData = [
  { month: "Jan", revenue: 78000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 95000 },
  { month: "Apr", revenue: 60000 },
  { month: "May", revenue: 70000 },
  { month: "Jun", revenue: 65000 },
  { month: "Jul", revenue: 45000 },
  { month: "Aug", revenue: 100000 },
  { month: "Sep", revenue: 92000 },
  { month: "Oct", revenue: 68000 },
  { month: "Nov", revenue: 110000 },
  { month: "Dec", revenue: 148000 },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "#5B5DF9" },
} satisfies ChartConfig

export interface RevenueTrendChartProps {
  className?: string;
}

export function RevenueTrendChart({ className }: RevenueTrendChartProps) {
  const [range, setRange] = React.useState<(typeof RANGE_OPTIONS)[number]>("Yearly");
  const gradientId = React.useId();

  return (
    <div className={cn("rounded-2xl border border-white/5 bg-[#0a0f16] p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white">Revenue Trend</h3>
        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                range === option ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <ChartContainer config={chartConfig} className="mt-6 h-[280px] w-full">
        <Recharts.LineChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <SvgLinearGradient id={gradientId} stops={HEADER_GRADIENT_STOPS} />
          </defs>
          <Recharts.CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <Recharts.XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Recharts.YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value: number) => `${value / 1000}K`}
          />
          <ChartTooltip content={<ChartTooltipContent labelKey="month" />} />
          <Recharts.Line
            type="monotone"
            dataKey="revenue"
            stroke={`url(#${gradientId})`}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: "#fff", stroke: "#5B5DF9", strokeWidth: 2 }}
          />
        </Recharts.LineChart>
      </ChartContainer>
    </div>
  );
}