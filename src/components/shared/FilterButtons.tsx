"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  /** Value written to the URL search param when this option is active. */
  value: string
  icon?: React.ReactNode
  /**
   * Renders the option as a locked, non-interactive pill (e.g. a premium
   * filter that requires an upgrade). Always shows a lock icon, ignoring
   * `icon`, and never touches the URL.
   */
  disabled?: boolean
}

export interface FilterButtonsProps {
  options: FilterOption[]
  /** The URL search param this filter group reads from / writes to. */
  paramName?: string
  /** The option value treated as "no filter" — removed from the URL instead of set. */
  defaultValue?: string
  /** Reset this param (e.g. "page") whenever the filter changes. */
  resetParamName?: string
  className?: string
}

/**
 * Global filter buttons. Renders one pill per option (mirrors the
 * "All / Amazon / eBay / Walmart" platform switcher), and keeps the active
 * value in sync with a URL search param so filtering is shareable/SSR-friendly.
 */
export function FilterButtons({
  options,
  paramName = "filter",
  defaultValue = "all",
  resetParamName = "page",
  className,
}: FilterButtonsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeValue = searchParams.get(paramName) ?? defaultValue

  function handleSelect(value: string) {
    if (value === activeValue) return

    const params = new URLSearchParams(searchParams.toString())
    if (value === defaultValue) {
      params.delete(paramName)
    } else {
      params.set(paramName, value)
    }
    if (resetParamName) params.delete(resetParamName)

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {options.map((option) => {
        if (option.disabled) {
          return (
            <span
              key={option.value}
              aria-disabled="true"
              title="Locked — upgrade to unlock this filter"
              className="flex h-9 cursor-not-allowed items-center gap-1.5 rounded-lg border border-border/40 bg-input/10 px-3.5 text-sm font-medium text-muted-foreground/50"
            >
              <Lock className="size-3.5" />
              {option.label}
            </span>
          )
        }

        const isActive = activeValue === option.value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-all",
              isActive
                ? "border-[#00EAFF] bg-[#00EAFF] text-black shadow-[0_4px_8.8px_0_rgba(0,234,255,0.65)]"
                : "border-border/70 bg-input/20 text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {option.icon}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}