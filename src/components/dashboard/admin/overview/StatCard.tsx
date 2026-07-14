"use client";

import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "@/lib/utils";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { ACCENT_GRADIENT_STOPS, SvgLinearGradient } from "@/components/layout/chart-gradients";

export interface StatCardProps {
  title: string;
  value: string;
  trend: {
    direction: "up" | "down";
    value: string;
    label: string;
  };
  /** Small series driving the sparkline — any relative values, doesn't need to match `value`. */
  sparkline: number[];
  className?: string;
}

const chartConfig = {
  value: { label: "Trend", color: "#00C9FF" },
} satisfies ChartConfig

export function StatCard({ title, value, trend, sparkline, className }: StatCardProps) {
  const gradientId = React.useId();
  const data = React.useMemo(
    () => sparkline.map((point, index) => ({ index, value: point })),
    [sparkline]
  );

  return (
    <div className={cn("rounded-2xl border border-white/5 bg-[#0d1420] p-5", className)}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>

      <div className="mt-3 flex md:flex-col xl:flex-row items-end md:items-start xl:items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-white sm:text-[28px]">{value}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold",
                trend.direction === "up"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {trend.direction === "up" ? "↗" : "↘"} {trend.value}
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-12 w-24 shrink-0">
          <Recharts.AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <SvgLinearGradient id={gradientId} stops={ACCENT_GRADIENT_STOPS} />
            </defs>
            <Recharts.Area
              type="monotone"
              dataKey="value"
              stroke={`url(#${gradientId})`}
              strokeWidth={2}
              fill="transparent"
              isAnimationActive={false}
            />
          </Recharts.AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}