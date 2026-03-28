/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Pie3DChart } from "../3Dcomponet/Pie3D";
import { Bar3DChart } from "../3Dcomponet/Bars3D";

const platformData = [
  { name: "Amazon", value: 400, color: "#915DFF" },
  { name: "Walmart", value: 300, color: "#00FF00" },
  { name: "eBay", value: 300, color: "#FFFF00" },
];

const ratingData = [
  { name: "Headphone", rating: 5, stars: 5 },
  { name: "Charger", rating: 4, stars: 4 },
  { name: "Bottle", rating: 3.5, stars: 3 },
  { name: "Book", rating: 2, stars: 2 },
  { name: "Mac Mini", rating: 3, stars: 3 },
  // Example for 1 star alignment
  { name: "Cable", rating: 1.2, stars: 1 },
];

/**
 * Custom component to render star clusters on the Y-Axis
 * mirrors the layout found in the figma reference
 */
const RenderStarAxis = ({ x, y, payload }: any) => {
  const count = parseInt(payload.value);
  return (
    <g transform={`translate(${x - 65},${y - 6})`}>
      {Array.from({ length: count }).map((_, i) => (
        <path
          key={i}
          d="M6 0L7.34708 4.1459L11.7063 4.1459L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459L4.65292 4.1459L6 0Z"
          fill="#00FFC3"
          transform={`translate(${i * 12}, 0)`}
          style={{ filter: "drop-shadow(0 0 3px rgba(0, 234, 255, 0.8))" }}
        />
      ))}
    </g>
  );
};

export function DashboardAnalytics() {
  return (
    <div className="w-full max-w-7xl mx-auto p-2 space-y-10">
      {/* --- TOP PLATFORMS --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-[#020606] p-8 rounded-[32px] border border-white/5 shadow-2xl relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-2xl font-bold">Top Platforms</h3>
          <span className="text-gray-500 text-sm font-medium">
            Last 30 Days
          </span>
        </div>
        {/* 2d pie chart  */}
        {/* <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <Pie
                data={platformData}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                style={{ filter: "url(#glow)" }}
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div> */}

        {/* 3D Pie Chart */}
        <div className="h-[300px] w-full">
          <Pie3DChart />
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {platformData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}`,
                }}
              />
              <span className="text-gray-400 text-xs font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- TOP RATED PRODUCT (Enhanced 3D Bar Chart) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-[#020606] p-8 rounded-[32px] border border-white/5 shadow-2xl overflow-hidden"
      >
        <h3 className="text-white text-2xl font-bold mb-10">
          Top Rated Product
        </h3>

        {/* 2d Bar Chart */}

        {/* <div className="h-110 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData} margin={{ left: 50, bottom: 20 }}>
              <defs>
                <filter
                  id="superGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feFlood
                    floodColor="#00FFC3"
                    floodOpacity="0.5"
                    result="color"
                  />
                  <feComposite
                    in="color"
                    in2="blur"
                    operator="in"
                    result="glow"
                  />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="barGradient3D" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FFC3" stopOpacity={1} />
                  <stop offset="100%" stopColor="#00FFC3" stopOpacity={0.4} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="0"
                vertical={true}
                horizontal={true}
                stroke="rgba(255, 255, 255, 0.08)"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 13 }}
                dy={15}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 5]} // Ensure the scale accounts for the full star range
                ticks={[1, 2, 3, 4, 5]} // Added '1' to the star ticks
                tick={<RenderStarAxis />}
              />

              <Tooltip
                cursor={{ fill: "rgba(0, 234, 255, 0.05)" }}
                contentStyle={{
                  backgroundColor: "#1C292A",
                  border: "1px solid rgba(0, 234, 255, 0.2)",
                  borderRadius: "12px",
                }}
              />

              <Bar
                dataKey="rating"
                fill="url(#barGradient3D)"
                radius={[15, 15, 15, 15]}
                barSize={45}
                style={{ filter: "url(#superGlow)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* 3D Bar Chart */}
        <div className="h-110 w-full pb-30">
          <Bar3DChart />
        </div>
      </motion.div>
    </div>
  );
}
