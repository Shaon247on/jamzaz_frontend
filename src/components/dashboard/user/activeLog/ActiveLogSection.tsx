"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  FilterButtons,
  type FilterOption,
} from "@/components/shared/FilterButtons";
import { SearchParamsInput } from "@/components/shared/SearchParamsInput";
import { SearchParamsPagination } from "@/components/shared/SearchParamsPagination";
import { NeonCard } from "@/components/shared/NeonCard";
import React from "react";

interface ActiveLogEntry {
  id: string;
  title: string;
  platform: "amazon" | "ebay" | "walmart";
  imageSrc: string;
  activityText: string;
}

const PLATFORM_META: Record<
  ActiveLogEntry["platform"],
  { label: string; color: string }
> = {
  amazon: { label: "Amazon", color: "#FF3B30" },
  ebay: { label: "eBay", color: "#F5A623" },
  walmart: { label: "Walmart", color: "#39FF14" },
};

const MOCK_ACTIVE_LOG: ActiveLogEntry[] = Array.from({ length: 8 }, (_, i) => {
  const platforms: ActiveLogEntry["platform"][] = ["amazon", "ebay", "walmart"];
  const platform = platforms[i % platforms.length];
  return {
    id: `log-${i + 1}`,
    title: "Wireless Bluetooth Earbuds Pro",
    platform,
    imageSrc: `https://picsum.photos/seed/active-log-${i + 1}/200/200`,
    activityText: "Active 2 hours ago",
  };
});

const FILTER_OPTIONS: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Amazon", value: "amazon" },
  { label: "eBay", value: "ebay" },
  { label: "Walmart", value: "walmart" },
];

const PAGE_SIZE = 3;

/**
 * Active Log section. Same layout/behavior as the wishlist listing
 * (global filter + search + pagination, all synced to the URL), but each
 * NeonCard only exposes "View" — there's nothing to delete from a log.
 */
export function ActiveLogSection() {
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("platform") ?? "all";
  const query = (searchParams.get("search") ?? "").trim().toLowerCase();
  const currentPage = Math.max(Number(searchParams.get("page") ?? "1") || 1, 1);

  const filtered = React.useMemo(() => {
    return MOCK_ACTIVE_LOG.filter((entry) => {
      const matchesPlatform =
        activeFilter === "all" || entry.platform === activeFilter;
      const matchesQuery = !query || entry.title.toLowerCase().includes(query);
      return matchesPlatform && matchesQuery;
    });
  }, [activeFilter, query]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Active Log</h2>
          <FilterButtons
            options={FILTER_OPTIONS}
            paramName="platform"
            defaultValue="all"
          />
        </div>

        <div className="w-full space-y-3 lg:max-w-sm">
          <h2 className="text-sm font-semibold text-foreground">Search</h2>
          <SearchParamsInput paramName="search" placeholder="Search here" />
        </div>
      </div>

      <div className="space-y-5">
        {paged.length > 0 ? (
          paged.map((entry) => {
            const meta = PLATFORM_META[entry.platform];
            return (
              <NeonCard
                key={entry.id}
                imageSrc={entry.imageSrc}
                title={entry.title}
                platformName={meta.label}
                platformColor={meta.color}
                addedText={entry.activityText}
                showView
                showDelete={false}
                onView={() => console.log("view", entry.id)}
              />
            );
          })
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No activity matches your filters.
          </p>
        )}
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <div className="h-9 w-40 animate-pulse rounded-lg bg-white/5" />
          </div>
        }
      >
        <SearchParamsPagination totalPages={totalPages} paramName="page" />
      </Suspense>
    </section>
  );
}
