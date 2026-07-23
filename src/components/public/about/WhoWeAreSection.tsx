"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Major Platform", value: "3" },
  { label: "Categories", value: "10" },
  { label: "Products", value: "10k+" },
  { label: "Refresh Rate", value: "48H" },
];

export default function WhoWeAreSection() {
  return (
    <section className="w-full py-24 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold">
            Who{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              We Are
            </span>
          </h2>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-xl">
            <p>
              TrendBurst is a marketplace insights hub providing key data and
              trends from Walmart, Amazon, and eBay.
            </p>
            <p>
              Our goal is to help businesses track performance, monitor pricing
              patterns, and understand market dynamics so they can make
              informed, data-driven decisions and stay ahead in competitive
              online markets.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Stats Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#141414] rounded-2xl p-6 md:p-8 flex flex-col items-start gap-2 border border-white/5 hover:border-cyan-500/20 transition-colors group"
                >
                  <span className="text-3xl md:text-4xl font-bold text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all">
                    {stat.value}
                  </span>
                  <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
