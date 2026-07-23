"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import hero_image from "../../../../public/assets/hero_image.png";
import {
  GetStartedButton,
  GhostButton,
} from "@/components/buttons/ButtonVariants";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* ✅ Background blur moved behind */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 relative">
          {/* Middle glow (also pushed back) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block -z-10">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[500px] h-[500px] rounded-full blur-[100px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 234, 255, 0.4) 0%, transparent 90%)",
              }}
            ></div>
          </div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-fit"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span className="text-xs font-medium text-cyan-300">
                  Updated every 48 hours
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-3"
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Discover </span>

                {/* ✅ Clean sharp gradient text */}
                <span className="inline-block bg-linear-to-r from-cyan-400 via-purple-500 to-magenta-500 bg-clip-text text-transparent [text-rendering:optimizeLegibility]">
                  Trending
                </span>

                <br />

                <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Products{" "}
                </span>

                <span className="text-white">Before Anyone Else</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-300 leading-relaxed max-w-lg"
            >
              Real-time insights into the trending products across Amazon, eBay,
              and Walmart. Make data-driven decisions for your drop-shipping
              business.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <div className="flex flex-row items-center justify-center gap-4">
                <GetStartedButton
                  size="md"
                  className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black px-6"
                />

                <GhostButton
                  size="md"
                  className="bg-black   hover:bg-black/80 text-white border border-white/10 px-6"
                >
                  Reach Out
                </GhostButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden p-1">
              <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-transparent">
                <Image
                  src={hero_image}
                  alt="TrendBurst Dashboard"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {["10k+", "48h", "3", "99.9%"].map((item, i) => (
            <div
              key={i}
              className="border border-slate-800/60 rounded-xl bg-black/40 p-6 hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <p className="text-3xl font-bold bg-[linear-gradient(90deg,rgba(0,234,255,1),rgba(38,155,249,1),rgba(91,93,249,1),rgba(175,40,249,1),rgba(223,17,238,1))] bg-clip-text text-transparent">
                {item}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {
                  [
                    "Products Tracked",
                    "Update Frequency",
                    "Platforms",
                    "Uptime",
                  ][i]
                }
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
