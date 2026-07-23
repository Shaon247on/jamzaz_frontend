"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, LayoutPanelLeft } from "lucide-react";

const intendedUses = [
  "Access marketplace pricing trends and analytics",
  "Monitor competitive insights across platforms",
  "Generate performance reports for business decisions",
];

const limitations = [
  "Data is for informational purposes only.",
  "Insights should not replace professional advice",
  "Historical data may not predict future results",
];

export function TermsHeroSection() {
  return (
    <section className="w-full py-24  relative overflow-hidden text-white">
      {/* 1. Global Background Glow - Subtle top-left */}
      <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-2/3 space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Terms & <span className="text-[#00D1FF]">Conditions</span>
          </h1>

          <div className="space-y-4 text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            <p>
              These terms govern your use of TrendBurst and outline the rules,
              responsibilities, and guidelines for accessing our marketplace
              insights platform.
            </p>
            <p className="text-sm md:text-base font-medium text-gray-500">
              Last updated: February 2026
            </p>
          </div>
        </motion.div>

        {/* Right Side: Database Icon with Square Neon Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] border border-[#00D1FF]/40 bg-[#00D1FF]/5 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,209,255,0.15)]">
            <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_0_20px_rgba(0,209,255,0.2)]" />
            <Database
              className="w-24 h-24 md:w-32 md:h-32 text-[#00D1FF] drop-shadow-[0_0_15px_rgba(0,209,255,0.6)]"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      </div>

      {/* 2. MIDDLE TRANSITION: THE 3D VIBE GLOW */}
      <div className="relative w-full h-80 flex items-center justify-center ">
        {/* This is the 3D Light Source */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-[100%] blur-[100px] opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 209, 255, 0.4) 0%, transparent 80%)",
            }}
          />
        </div>

        {/* The Glowing Divider Line */}
        <div className="w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(0,209,255,0.8)]" />
        </div>
      </div>

      {/* 3. BOTTOM SECTION: USE OF PLATFORM */}
      <section className="w-full px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,209,255,0.1)]">
              <LayoutPanelLeft className="w-8 h-8 text-[#00D1FF]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Use of Platform
            </h2>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-4xl mb-16 leading-relaxed">
            TrendBurst provides marketplace insights and analytics for Walmart,
            Amazon, and eBay. Our platform is designed to help sellers make
            informed decisions based on market data and trends.
          </p>

          {/* Intended Use & Limitations Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Intended Use
              </h3>
              <ul className="space-y-6">
                {intendedUses.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-gray-600 shrink-0" />
                    <p className="text-gray-400 text-base md:text-lg">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Limitations
              </h3>
              <ul className="space-y-6">
                {limitations.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-gray-600 shrink-0" />
                    <p className="text-gray-400 text-base md:text-lg">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
}
