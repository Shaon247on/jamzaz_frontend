import { Skeleton } from "@/components/ui/skeleton"
import { NeonCardSkeleton } from "@/components/shared/NeonCardSkeleton"

export interface ListingSkeletonProps {
  /** Number of card placeholders to render (match your page size). */
  count?: number
  /** Whether each card shows one action-button slot or two. */
  showDelete?: boolean
  /** Number of filter-pill placeholders in the platform/category row. */
  filterCount?: number
}

/**
 * Shared skeleton for the wishlist / active-log style sections: mirrors the
 * "Platforms + Search" header, a stack of NeonCard placeholders, and the
 * pagination row, so the loading state matches the real layout exactly.
 */
export function ListingSkeleton({
  count = 3,
  showDelete = true,
  filterCount = 4,
}: ListingSkeletonProps) {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-wrap items-center gap-2.5">
            {Array.from({ length: filterCount }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-20 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="w-full space-y-3 lg:max-w-sm">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>

      <div className="space-y-5">
        {Array.from({ length: count }).map((_, index) => (
          <NeonCardSkeleton key={index} showDelete={showDelete} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <Skeleton className="h-9 w-9 rounded-lg sm:w-24" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg sm:w-16" />
      </div>
    </section>
  )
}