"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Eye, FileText } from "lucide-react";

const pillars = [
  {
    title: "Market Trend Analysis",
    description:
      "Deep insights into emerging products trend across major marketplaces",
    icon: TrendingUp,
  },
  {
    title: "Price Patters Insights",
    description:
      "Understanding pricing dynamics and optimize your competitive positioning",
    icon: BarChart3,
  },
  {
    title: "Platform Performance",
    description:
      "Visibility into performance metrics across Walmart, Amazon, eBay",
    icon: Eye,
  },
  {
    title: "Data Clarity",
    description: "Complex data transform into clear, actionable intelligence",
    icon: FileText,
  },
];

export default function CorePillarsSection() {
  return (
    <section className="w-full py-24  px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What We{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Focus On
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Our platform is designed around four core pillars that drive every
            feature and insight we deliver
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black border border-white/5 rounded-2xl p-8 text-left group hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 transition-colors">
                <pillar.icon className="w-6 h-6 text-cyan-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {pillar.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
