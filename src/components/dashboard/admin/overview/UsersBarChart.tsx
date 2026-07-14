"use client";

import * as React from "react";
import * as Recharts from "recharts";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ACCENT_GRADIENT_STOPS, SvgLinearGradient } from "@/components/layout/chart-gradients";

const RANGE_OPTIONS = ["Jan - Jun '22", "Jul - Dec '22", "Jan - Jun '23"];

const usersData = [
  { month: "Jan", users: 38 },
  { month: "Feb", users: 30 },
  { month: "Mar", users: 35 },
  { month: "Apr", users: 43 },
  { month: "May", users: 33 },
  { month: "Jun", users: 45 },
];

const chartConfig = {
  users: { label: "Users", color: "#00C9FF" },
} satisfies ChartConfig

interface HighlightLabelProps {
  x?: number;
  y?: number;
  width?: number;
  index?: number;
}

export interface UsersBarChartProps {
  className?: string;
}

export function UsersBarChart({ className }: UsersBarChartProps) {
  const [range, setRange] = React.useState(RANGE_OPTIONS[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const highlightGradientId = React.useId();
  const dimGradientId = React.useId();
  const glowFilterId = React.useId();

  function renderHoverLabel({ x = 0, y = 0, width = 0, index = 0 }: HighlightLabelProps) {
    if (index !== hoveredIndex) return null;
    const entry = usersData[index];
    if (!entry) return null;
    return (
      <foreignObject x={x + width / 2 - 20} y={y - 28} width={40} height={22}>
        <div className="flex items-center justify-center rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-bold text-[#0a0f16]">
          {entry.users}%
        </div>
      </foreignObject>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-white/5 bg-[#0a0f16] p-5 sm:p-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white">Users</h3>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white sm:text-sm"
          >
            {range}
            <ChevronDown className="size-3.5" />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-white/10 bg-[#111826] p-1 shadow-lg">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setRange(option);
                    setIsOpen(false);
                  }}
                  className="w-full rounded-md px-2.5 py-1.5 text-left text-xs text-gray-300 hover:bg-white/5"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ChartContainer config={chartConfig} className="mt-6 h-[280px] w-full">
        <Recharts.BarChart data={usersData} margin={{ top: 24, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <SvgLinearGradient
              id={highlightGradientId}
              stops={ACCENT_GRADIENT_STOPS}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            />
            <linearGradient id={dimGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00C9FF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#00C9FF" stopOpacity={0.1} />
            </linearGradient>
            {/* Neon glow: blur a copy of the bar and merge it under the crisp original. */}
            <filter id={glowFilterId} x="-75%" y="-75%" width="250%" height="250%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <Recharts.CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <Recharts.XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Recharts.YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent labelKey="month" />} cursor={false} />
          <Recharts.Bar
            dataKey="users"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
            onMouseEnter={(_data, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {usersData.map((entry, index) => (
              <Recharts.Cell
                key={entry.month}
                fill={index === hoveredIndex ? `url(#${highlightGradientId})` : `url(#${dimGradientId})`}
                style={{
                  filter: index === hoveredIndex ? `url(#${glowFilterId})` : undefined,
                  cursor: "pointer",
                  transition: "filter 150ms ease",
                }}
              />
            ))}
            <Recharts.LabelList dataKey="users" content={renderHoverLabel} />
          </Recharts.Bar>
        </Recharts.BarChart>
      </ChartContainer>
    </div>
  );
}