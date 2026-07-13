"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUp, Bookmark, Eye, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Same 5-stop sweep used across the neon card / pagination / filter system.
const GRADIENT =
  "linear-gradient(135deg, #00EAFF 0%, #269BF9 25%, #5B5DF9 50%, #AF28F9 75%, #DF11EE 100%)"

export interface ProductProps {
  id: string
  name: string
  desc: string
  image: string
  platform: string
  trend: string
  views: string
  saves: string
  /** Per-product accent, used for the index badge (e.g. "#00f7ff", "#ff00ff"). */
  color: string
}

export interface ProductNeonCardProps {
  product: ProductProps
  onView?: (product: ProductProps) => void
  onSave?: (product: ProductProps) => void
  className?: string
}

/**
 * Global neon product card.
 *
 * - Border: 1-2px gradient sweep (same stops as the rest of the neon system).
 * - "Drop shadow": box-shadow can't be a gradient, so a blurred sibling layer
 *   painted with the same gradient sits behind the card — a true gradient
 *   halo instead of a single flat color.
 * - Image: next/image, filling a fixed-aspect box so the layout never shifts.
 * - CTA: the solid "pink" button variant; bookmark is an icon-only "primary"
 *   (cyan outline) button.
 */
export function ProductNeonCard({
  product,
  onView,
  onSave,
  className,
}: ProductNeonCardProps) {
  const { name, desc, image, platform, trend, views, saves, color } = product

  return (
    <div className={cn("group relative", className)}>
      {/* Gradient glow halo — approximates a linear-gradient drop shadow */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-[28px] opacity-60 blur-lg transition-opacity duration-300 group-hover:opacity-90"
        style={{ background: GRADIENT }}
      />

      {/* Gradient border */}
      <div
        className="relative rounded-3xl p-[1.5px]"
        style={{ background: GRADIENT }}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#0a0c10]">
          {/* Image */}
          <div className="relative aspect-4/3 w-full shrink-0 sm:aspect-16/11">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />

            <span
              className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-bold backdrop-blur-sm"
              style={{ color }}
            >
              {product.id}
            </span>

            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-sm">
              <ArrowUp className="size-3" />
              {trend}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-4 bg-linear-to-br from-gray-950 via-gray-800 to-gray-700 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 flex-1 truncate text-base font-bold text-white sm:text-lg">
                {name}
              </h3>
              <span className="shrink-0 rounded-md border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-500">
                {platform}
              </span>
            </div>

            <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
              {desc.slice(0,100)}....
            </p>

            <div className="flex items-center gap-5 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Eye className="size-4" />
                {views}
              </span>
              <span className="flex items-center gap-1.5">
                <Bookmark className="size-4" />
                {saves}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-3">
              <Button
                type="button"
                variant="pink"
                size="xl"
                className="flex-1"
                onClick={() => onView?.(product)}
              >
                <ExternalLink /> View Product
              </Button>

              <Button
                type="button"
                variant="primary"
                size="icon-lg"
                className="h-11 w-11 shrink-0 rounded-xl"
                aria-label="Save product"
                onClick={() => onSave?.(product)}
              >
                <Bookmark />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductNeonCard