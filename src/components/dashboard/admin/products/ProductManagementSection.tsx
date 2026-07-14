import { Suspense } from "react";
import {
  FilterButtons,
  type FilterOption,
} from "@/components/shared/FilterButtons";
import { SearchParamsInput } from "@/components/shared/SearchParamsInput";
import { SearchParamsPagination } from "@/components/shared/SearchParamsPagination";
import { ProductTable } from "./ProductTable";
import { ProductTableSkeleton } from "./ProductTableSkeleton";
import type { ProductRow } from "@/types/product.types";

// --- Mock Data -------------------------------------------------------------
const MOCK_PRODUCTS: ProductRow[] = [
  {
    id: "1",
    name: "Modern Sofa Set",
    category: "Living",
    platform: "Paisy Nation",
    viewer: 1245,
  },
  {
    id: "2",
    name: "Kitchen Knife Set",
    category: "Kitchen",
    platform: "Paisy Nation",
    viewer: 876,
  },
  {
    id: "3",
    name: "Vintage Table Lamp",
    category: "Home",
    platform: "Paisy Nation",
    viewer: 543,
  },
  {
    id: "4",
    name: "Leather Office Chair",
    category: "Living",
    platform: "Paisy Nation",
    viewer: 2341,
  },
  {
    id: "5",
    name: "Ceramic Dinner Set",
    category: "Kitchen",
    platform: "Paisy Nation",
    viewer: 987,
  },
  {
    id: "6",
    name: "Wall Art Decor",
    category: "Home",
    platform: "Paisy Nation",
    viewer: 654,
  },
  {
    id: "7",
    name: "Car Floor Mats",
    category: "Auto",
    platform: "Paisy Nation",
    viewer: 321,
  },
  {
    id: "8",
    name: "Designer Handbag",
    category: "Fashion",
    platform: "Paisy Nation",
    viewer: 1876,
  },
  {
    id: "9",
    name: "Smart LED Bulb",
    category: "Home",
    platform: "Paisy Nation",
    viewer: 432,
  },
  {
    id: "10",
    name: "Stainless Steel Pan",
    category: "Kitchen",
    platform: "Paisy Nation",
    viewer: 765,
  },
  {
    id: "11",
    name: "Rug Carpet",
    category: "Living",
    platform: "Paisy Nation",
    viewer: 543,
  },
  {
    id: "12",
    name: "Sunglasses",
    category: "Fashion",
    platform: "Paisy Nation",
    viewer: 1234,
  },
];

// Static categories for filter
const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Home", value: "Home" },
  { label: "Living", value: "Living" },
  { label: "Kitchen", value: "Kitchen" },
  { label: "Fashion", value: "Fashion" },
  { label: "Auto", value: "Auto" },
];

const PAGE_SIZE = 5;

interface ProductManagementSectionProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
  };
}

// MAIN SERVER COMPONENT
export default async function ProductManagementSection({
  searchParams,
}: ProductManagementSectionProps) {
  const categoryFilter = searchParams.category ?? "all";
  const query = (searchParams.search ?? "").trim().toLowerCase();
  const currentPage = Math.max(Number(searchParams.page ?? "1") || 1, 1);

  // Server-side filtering
  const filtered = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Calculate stats
  const totalProducts = filtered.length;
  const uniqueCategories = [...new Set(filtered.map((p) => p.category))];

  return (
    <div className="space-y-6 -mt-12 md:-mt-20">
      {/* Section header with stats */}
      <div className="rounded-2xl border border-white/5 bg-[#0d1420] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Product Management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage products across Paisy Nation platform
            </p>
          </div>
          <div className="mt-2 flex gap-4 sm:mt-0">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                Total Products
              </div>
              <div className="text-lg font-semibold text-white">
                {totalProducts}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Categories</div>
              <div className="text-lg font-semibold text-[#00D3F3]">
                {uniqueCategories.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-sm">
          <Suspense
            fallback={
              <div className="h-11 w-full animate-pulse rounded-lg bg-white/5" />
            }
          >
            <SearchParamsInput
              paramName="search"
              placeholder="Search products..."
            />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="h-11 w-40 animate-pulse rounded-lg bg-white/5" />
          }
        >
          <FilterButtons
            options={CATEGORY_OPTIONS}
            paramName="category"
            defaultValue="all"
          />
        </Suspense>
      </div>

      {/* Table with Suspense */}
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductTable
          data={paged}
          totalItems={filtered.length}
          categories={CATEGORY_OPTIONS.map((opt) => opt.value).filter(
            (v) => v !== "all",
          )}
        />
      </Suspense>

      {/* Pagination - Also needs Suspense */}
      <Suspense
        fallback={
          <div className="flex justify-center">
            <div className="h-9 w-40 animate-pulse rounded-lg bg-white/5" />
          </div>
        }
      >
        <SearchParamsPagination totalPages={totalPages} paramName="page" />
      </Suspense>
    </div>
  );
}