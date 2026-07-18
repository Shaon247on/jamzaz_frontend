"use client";

import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";

/**
 * Type definitions for Insight Block
 */
export interface InsightBlockProps {
  id: number;
  image: StaticImageData | string;
  imageAlt: string;
  title: string; // Changed to string for plain text
  titleHighlight?: string; // Word to highlight
  titleHighlightColor?: string; // Tailwind color class
  description: string;
  isImageFirst?: boolean; // Controls layout: true = image left, false = image right
  logoSrc?: StaticImageData | string; // Optional SVG logo/icon
}

export interface ProductInsightsSectionProps {
  blocks: InsightBlockProps[];
  title?: ReactNode;
  subtitle?: string;
}

/**
 * Reusable InsightBlock Component
 * Handles alternating layout and animations
 */
const InsightBlock = ({
  id,
  image,
  imageAlt,
  title,
  titleHighlight,
  titleHighlightColor = "text-primary",
  description,
  isImageFirst = true,
  logoSrc,
}: InsightBlockProps) => {
  // Helper function to render title with highlight
  const renderTitle = () => {
    if (!titleHighlight) {
      return title;
    }

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className={titleHighlightColor}>{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };
  // Animation variants for scroll animations
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

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: isImageFirst ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: isImageFirst ? 60 : -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col ${
        isImageFirst ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-12 items-center py-12 lg:py-16`}
    >
      {/* Image Container */}
      <motion.div
        variants={imageVariants}
        className="w-full lg:w-1/2 flex-shrink-0"
      >
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={id <= 2} // Prioritize first 2 images
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Text Container */}
      <motion.div
        variants={textVariants}
        className="w-full lg:w-1/2 flex flex-col gap-4"
      >
        {/* Title with support for colored text and logo */}
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {renderTitle()}
          </h3>
          {/* Logo/Icon display */}
          {logoSrc && (
            <div className="w-fit">
              <Image
                src={logoSrc}
                alt="Logo"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-lg text-foreground/70 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main Product Insights Section Component
 */
export const ProductInsightsSection = ({
  blocks,
  title = (
    <>
      Reimagine Product{" "}
      <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Tracking
      </span>
      <br />
      <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        & Insights
      </span>
    </>
  ),
  subtitle = "Monitor top marketplaces, analyze trends, and make smarter decisions. Accurate data, effortless workflow, and support to guide you every step.",
}: ProductInsightsSectionProps) => {
  // Header animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <section className="w-full pt-20 lg:pt-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background gradient glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mb-16 lg:mb-24 text-center"
        >
          {/* Main Title */}
          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Insight Blocks */}
        <div className="space-y-16 lg:space-y-20">
          {blocks.map((block, index) => (
            <InsightBlock
              key={block.id}
              {...block}
              isImageFirst={index % 2 === 0} // Alternate layout
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductInsightsSection;
