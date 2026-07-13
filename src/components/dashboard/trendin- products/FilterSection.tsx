"use client"

import { motion } from "framer-motion"
import { Filter, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FilterButtons, type FilterOption } from "@/components/shared/FilterButtons"

// Defines the gradient "paint" the Filter icons use — rendered once, referenced by id.
const GradientFilterIcon = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop stopColor="#00eaff" offset="0%" />
        <stop stopColor="#269bf9" offset="25%" />
        <stop stopColor="#5b5df9" offset="50%" />
        <stop stopColor="#af28f9" offset="75%" />
        <stop stopColor="#df11ee" offset="100%" />
      </linearGradient>
    </defs>
  </svg>
)

// Only "All categories" / "All" are unlocked; the rest require the add-on.
const categoryOptions: FilterOption[] = [
  { label: "All categories", value: "all" },
  { label: "Electronics", value: "electronics", disabled: true },
  { label: "Fashion & Beauty", value: "fashion-beauty", disabled: true },
  { label: "Clothing", value: "clothing", disabled: true },
  { label: "Home & Garden", value: "home-garden", disabled: true },
]

const marketplaceOptions: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Amazon", value: "amazon", disabled: true },
  { label: "eBay", value: "ebay", disabled: true },
  { label: "Walmart", value: "walmart", disabled: true },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <Filter size={20} stroke="url(#blue-purple-gradient)" />
      <h3 className="text-lg font-medium text-white">{children}</h3>
      <span className="flex items-center gap-1 rounded border border-purple-500/30 bg-[#2d1b4d] px-2 py-0.5 text-[10px] font-bold uppercase text-purple-400">
        <Lock size={10} /> Locked
      </span>
    </div>
  )
}

const FilterSection = () => {
  return (
    <div className="space-y-10 rounded-3xl bg-[#0a0c10] p-4 text-white sm:p-8">
      {/* Renders the gradient definition so the Filter icon strokes can find the id */}
      <GradientFilterIcon />

      {/* 1. Category filter */}
      <section>
        <SectionHeading>Filter by category</SectionHeading>
        <FilterButtons options={categoryOptions} paramName="category" defaultValue="all" />
      </section>

      {/* 2. Marketplace filter */}
      <section>
        <SectionHeading>Filter by Marketplace</SectionHeading>
        <FilterButtons options={marketplaceOptions} paramName="marketplace" defaultValue="all" />
      </section>

      {/* 3. Upgrade banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#1a132d] p-6 sm:p-8"
      >
        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2">
            <Lock size={20} className="text-purple-500" />
            <h4 className="text-xl font-bold text-purple-400">Unlock Category Filter</h4>
          </div>
          <p className="mb-6 max-w-lg text-sm leading-relaxed text-gray-400">
            Upgrade to the category add-on ($5/month) to filter products by specific
            categories and get deeper insights into each market segment.
          </p>
          <Button type="button" variant="pink" size="xl" className="w-full sm:w-auto">
            Upgrade Now
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default FilterSection