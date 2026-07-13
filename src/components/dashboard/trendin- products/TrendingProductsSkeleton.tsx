"use client";

import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="relative rounded-3xl border border-slate-800 bg-[#0a0c10] overflow-hidden">
      {/* Image */}
      <Skeleton className="aspect-[4/3] w-full rounded-none bg-slate-800" />

      <div className="space-y-5 p-6">
        {/* Title + Badge */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40 bg-slate-800" />
          <Skeleton className="h-6 w-20 rounded-md bg-slate-800" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-800" />
          <Skeleton className="h-4 w-5/6 bg-slate-800" />
          <Skeleton className="h-4 w-4/6 bg-slate-800" />
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          <Skeleton className="h-4 w-16 bg-slate-800" />
          <Skeleton className="h-4 w-16 bg-slate-800" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-11 flex-1 rounded-xl bg-slate-800" />
          <Skeleton className="h-11 w-11 rounded-xl bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

function FilterSectionSkeleton() {
  return (
    <div className="space-y-10 rounded-3xl bg-[#0a0c10] p-8">
      {[1, 2].map((section) => (
        <div key={section} className="space-y-5">
          <Skeleton className="h-6 w-52 bg-slate-800" />

          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-9 w-32 rounded-lg bg-slate-800"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Upgrade Card */}
      <div className="rounded-3xl border border-slate-800 p-8 space-y-5">
        <Skeleton className="h-7 w-64 bg-slate-800" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-800" />
          <Skeleton className="h-4 w-5/6 bg-slate-800" />
          <Skeleton className="h-4 w-3/5 bg-slate-800" />
        </div>
        <Skeleton className="h-12 w-44 rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}

export default function TrendingProductsSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0c10] p-6 lg:p-10 animate-pulse">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Skeleton className="h-10 w-80 bg-slate-800" />
        <Skeleton className="h-5 w-64 bg-slate-800" />
      </div>

      {/* Filters */}
      <FilterSectionSkeleton />

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}