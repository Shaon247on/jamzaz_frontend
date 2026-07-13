"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SearchParamsPaginationProps {
  totalPages: number
  /** The URL search param this pagination reads from / writes to. */
  paramName?: string
  /** How many page numbers to show on either side of the current page. */
  siblingCount?: number
  className?: string
}

/** Builds a 1-indexed page list with "ellipsis" markers, e.g. [1,2,3,"...",67,68]. */
function getPageRange(current: number, total: number, siblingCount: number) {
  const totalVisible = siblingCount * 2 + 5

  if (total <= totalVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  const range: (number | "ellipsis")[] = [1]

  if (showLeftEllipsis) range.push("ellipsis")

  for (let page = Math.max(leftSibling, 2); page <= Math.min(rightSibling, total - 1); page++) {
    range.push(page)
  }

  if (showRightEllipsis) range.push("ellipsis")

  range.push(total)

  return range
}

/**
 * Global pagination. Reads/writes `?page=` (or a custom param name) in the
 * URL. Renders numbered pills with ellipsis for long ranges, matching the
 * reference design's "1 2 3 ... 67 68" layout.
 */
export function SearchParamsPagination({
  totalPages,
  paramName = "page",
  siblingCount = 1,
  className,
}: SearchParamsPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Math.min(
    Math.max(Number(searchParams.get(paramName) ?? "1") || 1, 1),
    Math.max(totalPages, 1)
  )

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return

    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete(paramName)
    } else {
      params.set(paramName, String(page))
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  if (totalPages <= 1) return null

  const pages = getPageRange(currentPage, totalPages, siblingCount)

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2 sm:gap-3", className)}
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium text-foreground transition-colors hover:text-[#00EAFF] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex size-9 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="size-4" />
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => goToPage(page)}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-all",
                page === currentPage
                  ? "border-[3px] border-[#00EAFF] text-[#00EAFF] shadow-[0_4px_8.8px_0_rgba(0,234,255,0.65)]"
                  : "border border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium text-foreground transition-colors hover:text-[#00EAFF] disabled:pointer-events-none disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}