"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "item-1",
    question: "What does this platform do?",
    answer:
      "This platform provides clear and reliable insights into major online marketplaces, helping users understand trends, pricing patterns, and overall platform performance across Walmart, Amazon, and eBay. It's designed to give a quick, high-level view of market activity so you can make more informed decisions with confidence.",
  },
  {
    id: "item-2",
    question: "Which marketplaces are supported?",
    answer:
      "We currently support major e-commerce platforms including Walmart, Amazon, eBay, WooCommerce, and BigCommerce. Our system continuously analyzes millions of products across these platforms to provide you with comprehensive market insights and competitive analysis in real-time.",
  },
  {
    id: "item-3",
    question: "How secure is the platform?",
    answer:
      "Security is our top priority. We employ enterprise-grade encryption (AES-256), SSL/TLS protocols, and comply with GDPR, CCPA, and PCI DSS standards. All data is stored on secure, redundant servers with automatic backups. We conduct regular security audits and penetration testing to ensure your data remains protected.",
  },
  {
    id: "item-4",
    question: "What type of insights can I expect?",
    answer:
      "You can expect comprehensive insights including real-time price tracking, competitor analysis, sales velocity metrics, product performance trends, seasonal demand patterns, supplier information, and market gap identification. Our AI-powered analytics help you discover winning products before they become saturated.",
  },
  {
    id: "item-5",
    question: "How often is the data updated?",
    answer:
      "Our data is updated continuously throughout the day with real-time market feeds. Price data refreshes every 15-30 minutes, sales metrics update hourly, and trend analysis is processed every 6 hours. You can always access the latest market information to make timely business decisions.",
  },
  {
    id: "item-6",
    question: "Who is this platform best suited for?",
    answer:
      "This platform is ideal for e-commerce entrepreneurs, dropshippers, sellers on major marketplaces, digital marketing agencies, and product researchers. Whether you're just starting or scaling your business, TrendBurst provides the data-driven insights you need to stay ahead of the competition.",
  },
];

// Accordion Components
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className="flex flex-1 items-center justify-between py-5 px-6 font-semibold text-lg text-white hover:no-underline transition-colors duration-300 group [&[data-state=open]]:text-cyan-300"
      {...props}
    >
      {children}
      <motion.div className="shrink-0">
        <Plus className="h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors duration-300" />
      </motion.div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className="overflow-hidden" {...props}>
    <motion.div
      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
      animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.25 },
      }}
      className="px-6 pb-5 text-gray-300 leading-relaxed"
    >
      {children}
    </motion.div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

// Main FAQ Section Component
export function FAQSection() {
  return (
    <section className="w-full min-h-screen py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute w-32 h-52 bg-[#DF11EE1A] top-0 right-0 z-20" />
      <div className="absolute w-32 h-52 bg-[#00EAFF1A] bottom-0 left-0 z-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* FAQs Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6 hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-cyan-300 tracking-wide">
              FAQs
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Find questions and answers related to the design system, purchase,
            updates, and support.
          </motion.p>
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Accordion Container with glassmorphism */}
          <div className="relative">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              defaultValue="item-1"
            >
              {faqData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={item.id}
                    className="group relative border border-slate-700/50 bg-gradient-to-r from-slate-800/40 via-slate-800/20 to-slate-800/40 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-600/70 hover:bg-gradient-to-r hover:from-slate-800/60 hover:via-slate-800/40 hover:to-slate-800/60"
                  >
                    {/* Top border accent */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent" />

                    {/* Question Trigger */}
                    <AccordionTrigger className="text-left group-data-[state=open]:text-cyan-300 transition-colors duration-300">
                      {item.question}
                    </AccordionTrigger>

                    {/* Answer Content */}
                    <AccordionContent className="px-6 pb-5 text-gray-300 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            {/* Bottom shadow accent */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        /* Animations handled by shadcn default */
      `}</style>
    </section>
  );
}

export default FAQSection;
