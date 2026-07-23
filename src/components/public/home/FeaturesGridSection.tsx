"use client";

import { motion, Variants } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Clock,
  Brain,
} from "lucide-react";

interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    id: 1,
    icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
    title: "Top Trending Products",
    description:
      "Discover the top trending products across all major platforms updated every 24 hours",
  },
  {
    id: 2,
    icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
    title: "Category Insights",
    description:
      "Unlock category-specific data to find the best products in your niche",
  },
  {
    id: 3,
    icon: <PieChart className="w-8 h-8 text-cyan-400" />,
    title: "Visual Analytics",
    description:
      "Interactive charts and graphs for quick analytics performance insights",
  },
  {
    id: 4,
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    title: "Quick Actions",
    description:
      "Perform essential tasks and start selling immediately like bulk actions",
  },
  {
    id: 5,
    icon: <Clock className="w-8 h-8 text-cyan-400" />,
    title: "Real-Time Updates",
    description:
      "Get instant notifications from News from Amazon, eBay, Walmart",
  },
  {
    id: 6,
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    title: "Data-Driven Decisions",
    description: "Make smarter decisions backed by real market data and trends",
  },
];

/**
 * Features Grid Section
 * Displays 6 feature cards in a 3x2 grid with hover effects
 */
export function FeaturesGridSection() {
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
    <section className="w-full pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Win
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Powerful tools designed specially for drop shippers who want to stay
            ahead of the competition
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
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="relative group"
            >
              {/* Card Background with gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 h-full hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                {/* Icon Container */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                  style={{ backgroundColor: "hsla(185, 100%, 50%, 0.3)" }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
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
