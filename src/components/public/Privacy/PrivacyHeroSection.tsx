"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";
const infoTypes = [
  "Publicly available product, pricing, and listing data from marketplaces.",
  "Platform-level performance and trend-related information.",
  "Non-personal data used exclusively for analytics and insights.",
];

const collectionPurposes = [
  "To analyze marketplace trends and pricing patterns over time.",
  "To generate insights on product performance and market dynamics.",
  "To improve data accuracy, reporting, and platform reliability.",
];

export function PrivacyHeroSection() {
  return (
    <section className="w-full py-24  relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-2/3 space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Privacy <span className="text-[#00D1FF]">Policy</span>
          </h1>

          <div className="space-y-4 text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            <p>
              Your privacy matters to us. We are committed to protecting your
              data and maintaining transparency in how we collect, use, and
              secure your information.
            </p>
            <p className="text-sm md:text-base font-medium text-gray-500">
              Last updated: February 2026
            </p>
          </div>
        </motion.div>
        <div className="absolute inset-0 pointer-events-none hidden lg:block -z-10">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 234, 255, 0.4) 0%, transparent 90%)",
            }}
          ></div>
        </div>
        {/* Right Side: Shield Icon with Neon Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] border border-[#00D1FF]/40 bg-[#00D1FF]/5 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,209,255,0.15)]">
            {/* Inner Neon Glow */}
            <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_0_20px_rgba(0,209,255,0.2)]" />

            <ShieldCheck
              className="w-24 h-24 md:w-32 md:h-32 text-[#00D1FF] drop-shadow-[0_0_15px_rgba(0,209,255,0.6)]"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Glowing Divider */}
      {/* <div className="max-w-7xl mx-auto my-24 relative">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-[#00D1FF] blur-[1px] shadow-[0_0_15px_rgba(0,209,255,0.8)]" />
      </div> */}

      <motion.div className="flex justify-center my-40 ">
        <div className="h-1 w-full max-w-md bg-linear-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
      </motion.div>

      <section className="w-full   px-6 relative overflow-hidden">
        {/* Subtle Background Glow to maintain 3D vibe */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none -translate-x-1/3 -translate-y-1/3 -z-10 opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Section Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
            {/* Icon Container with Teal border/glow */}
            <div className="w-16 h-16 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 flex items-center justify-center shrink-0">
              <FileText className="w-8 h-8 text-[#00D1FF]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Data Collection
            </h2>
          </div>

          {/* Main Description */}
          <p className="text-gray-400 text-lg md:text-xl max-w-4xl mb-16 leading-relaxed">
            We collect marketplace data from Walmart, Amazon, and eBay to
            provide accurate trends, performance insights, and a clearer
            understanding of market behavior for businesses.
          </p>

          {/* Info & Purpose Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Information Type Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Information Type
              </h3>
              <ul className="space-y-6">
                {infoTypes.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    {/* Custom solid grey dot */}
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-gray-500 shrink-0" />
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Collection Purpose Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-black border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Collection Purpose
              </h3>
              <ul className="space-y-6">
                {collectionPurposes.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    {/* Custom solid grey dot */}
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-gray-500 shrink-0" />
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
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
