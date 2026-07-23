"use client";

import { motion, Variants } from "framer-motion"; // ✅ Import Variants type

/**
 * Features Page Hero Section
 * Displays the main headline and description for the features page
 */
export function FeaturesHeroSection() {
  // ✅ Explicitly type as Variants to satisfy TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // ✅ Explicitly type as Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut", // TypeScript now knows this matches framer's internal Easing type
      },
    },
  };

  return (
    <section
      className="w-full py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[60vh] flex items-center"
      style={{ backgroundColor: "hsla(193, 35%, 8%, 1)" }}
    >
      {/* Background gradient glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Unlock the Power of{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Marketplace Intelligence
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Transform raw marketplace data into actionable insights. Monitor
            trends, analyze performance, and make data-driven decisions across
            Walmart, Amazon, and eBay
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center my-8 "
          >
            <div className="h-1 w-full max-w-md bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
