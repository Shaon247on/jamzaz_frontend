"use client";

import { Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Suspense, useMemo } from "react";

import {
  FilterButtons,
  type FilterOption,
} from "@/components/shared/FilterButtons";
import { SearchParamsInput } from "@/components/shared/SearchParamsInput";
import { SearchParamsPagination } from "@/components/shared/SearchParamsPagination";
import { NeonCard } from "@/components/shared/NeonCard";

// --- Mock data -------------------------------------------------------------
// Swap this for a real fetch (RTK Query endpoint, server action, etc). Shape
// mirrors what the cards need: title, platform + accent color, image, and
// a human-readable "added" string.

interface Listing {
  id: string;
  title: string;
  platform: "amazon" | "ebay" | "walmart";
  imageSrc: string;
  addedText: string;
}

const PLATFORM_META: Record<
  Listing["platform"],
  { label: string; color: string }
> = {
  amazon: { label: "Amazon", color: "#FF3B30" },
  ebay: { label: "eBay", color: "#F5A623" },
  walmart: { label: "Walmart", color: "#39FF14" },
};

const MOCK_LISTINGS: Listing[] = Array.from({ length: 9 }, (_, i) => {
  const platforms: Listing["platform"][] = ["amazon", "ebay", "walmart"];
  const platform = platforms[i % platforms.length];
  return {
    id: `listing-${i + 1}`,
    title: "Wireless Bluetooth Earbuds Pro",
    platform,
    imageSrc: `https://picsum.photos/seed/listing-${i + 1}/200/200`,
    addedText: "Added 2 hours ago",
  };
});

const FILTER_OPTIONS: FilterOption[] = [
  { label: "All", value: "all" },
  {
    label: "Amazon",
    value: "amazon",
    icon: <Lock className="size-3.5" />,
  },
  {
    label: "eBay",
    value: "ebay",
    icon: <Lock className="size-3.5" />,
  },
  {
    label: "Walmart",
    value: "walmart",
    icon: <Lock className="size-3.5" />,
  },
];

const PAGE_SIZE = 3;

export function ProductListingSection() {
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter") ?? "all";
  const query = (searchParams.get("search") ?? "").trim().toLowerCase();
  const currentPage = Math.max(Number(searchParams.get("page") ?? "1") || 1, 1);

  const filtered = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      const matchesPlatform =
        activeFilter === "all" || listing.platform === activeFilter;
      const matchesQuery =
        !query || listing.title.toLowerCase().includes(query);
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
          <h2 className="text-sm font-semibold text-foreground">Platforms</h2>
          <FilterButtons
            options={FILTER_OPTIONS}
            paramName="filter"
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
          paged.map((listing) => {
            const meta = PLATFORM_META[listing.platform];
            return (
              <NeonCard
                key={listing.id}
                imageSrc={listing.imageSrc}
                title={listing.title}
                platformName={meta.label}
                platformColor={meta.color}
                addedText={listing.addedText}
                showView
                showDelete
                onView={() => console.log("view", listing.id)}
                onDelete={() => console.log("delete", listing.id)}
              />
            );
          })
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No listings match your filters.
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
