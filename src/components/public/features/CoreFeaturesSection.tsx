"use client";

import { motion, Variants } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  RefreshCw,
} from "lucide-react";

interface CoreFeature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

const coreFeatures: CoreFeature[] = [
  {
    id: 1,
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Marketplace Insights",
    description:
      "Monitor real-time activity across Walmart, Amazon, and eBay with comprehensive data analysis",
    iconColor: "bg-cyan-500/30",
  },
  {
    id: 2,
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Pricing trend analysis",
    description:
      "Identify evolving pricing patterns and market movement to stay ahead in the competition",
    iconColor: "bg-blue-500/30",
  },
  {
    id: 3,
    icon: <PieChart className="w-6 h-6" />,
    title: "Platform performance overview",
    description:
      "High-level visibility into marketplace health and key performance indicators",
    iconColor: "bg-purple-500/30",
  },
  {
    id: 4,
    icon: <LineChart className="w-6 h-6" />,
    title: "Interactive graph and charts",
    description:
      "Visualize data clearly and quickly with intuitive, interactive visualizations",
    iconColor: "bg-cyan-500/30",
  },
  {
    id: 5,
    icon: <Layers className="w-6 h-6" />,
    title: "Multiple platform coverage",
    description:
      "Insights across multiple marketplaces in one unified platform",
    iconColor: "bg-blue-500/30",
  },
  {
    id: 6,
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Reliable Updates",
    description:
      "Constance and dependable data refresh cycles you can count on",
    iconColor: "bg-purple-500/30",
  },
];

/**
 * Core Features Section
 * Displays 6 core features in a 3x2 grid on the features page
 */
export function CoreFeaturesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="w-full py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: "hsla(193, 35%, 8%, 1)" }}
    >
      {/* Background gradient glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent">
              Core
            </span>{" "}
            Features
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Everything you need to understand and optimize your marketplace
            presence
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {coreFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="relative group"
            >
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 h-full hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                {/* Icon Container */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${feature.iconColor} text-cyan-400 mb-4`}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
