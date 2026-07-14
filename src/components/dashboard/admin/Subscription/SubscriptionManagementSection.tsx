import { Suspense } from "react";
import { GlobalSelectFilter } from "@/components/shared/GlobalSelectFilter";
import { SearchParamsInput } from "@/components/shared/SearchParamsInput";
import { SearchParamsPagination } from "@/components/shared/SearchParamsPagination";
import { SubscriptionTable } from "./SubscriptionTable";
import { SubscriptionTableSkeleton } from "./SubscriptionTableSkeleton";
import type { SubscriptionRow } from "@/types/subscription.type";

// --- Mock Data -------------------------------------------------------------
const MOCK_SUBSCRIPTIONS: SubscriptionRow[] = [
  {
    id: "1",
    userEmail: "sarah@example.com",
    plan: "Starter",
    billingCycle: "Monthly",
    status: "active",
    startDate: "2024-01-15",
  },
  {
    id: "2",
    userEmail: "john@example.com",
    plan: "Starter (Add-ons)",
    billingCycle: "Monthly",
    status: "cancelled",
    startDate: "2023-11-20",
  },
  {
    id: "3",
    userEmail: "smith@example.com",
    plan: "Starter",
    billingCycle: "Yearly",
    status: "active",
    startDate: "2024-02-01",
  },
  {
    id: "4",
    userEmail: "josue@example.com",
    plan: "Starter",
    billingCycle: "Monthly",
    status: "expired",
    startDate: "2023-08-10",
  },
  {
    id: "5",
    userEmail: "parker@example.com",
    plan: "Professional",
    billingCycle: "Monthly",
    status: "active",
    startDate: "2024-03-05",
  },
  {
    id: "6",
    userEmail: "johnathon@example.com",
    plan: "Starter",
    billingCycle: "Yearly",
    status: "active",
    startDate: "2023-12-12",
  },
  {
    id: "7",
    userEmail: "maria@example.com",
    plan: "Professional",
    billingCycle: "Monthly",
    status: "cancelled",
    startDate: "2023-09-25",
  },
  {
    id: "8",
    userEmail: "david@example.com",
    plan: "Starter",
    billingCycle: "Monthly",
    status: "expired",
    startDate: "2023-07-01",
  },
  {
    id: "9",
    userEmail: "emily@example.com",
    plan: "Starter (Add-ons)",
    billingCycle: "Yearly",
    status: "active",
    startDate: "2024-04-18",
  },
  {
    id: "10",
    userEmail: "michael@example.com",
    plan: "Professional",
    billingCycle: "Monthly",
    status: "active",
    startDate: "2024-01-28",
  },
  {
    id: "11",
    userEmail: "jessica@example.com",
    plan: "Starter",
    billingCycle: "Monthly",
    status: "cancelled",
    startDate: "2023-10-15",
  },
  {
    id: "12",
    userEmail: "robert@example.com",
    plan: "Professional",
    billingCycle: "Yearly",
    status: "expired",
    startDate: "2023-06-20",
  },
];

// Filter options
const PLAN_OPTIONS = [
  { label: "All Plans", value: "all" },
  { label: "Starter", value: "Starter" },
  { label: "Starter (Add-ons)", value: "Starter (Add-ons)" },
  { label: "Professional", value: "Professional" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Expired", value: "expired" },
];

const PAGE_SIZE = 5;

interface SubscriptionManagementSectionProps {
  searchParams: {
    plan?: string;
    status?: string;
    search?: string;
    page?: string;
  };
}

// MAIN SERVER COMPONENT
export default async function SubscriptionManagementSection({
  searchParams,
}: SubscriptionManagementSectionProps) {
  const planFilter = searchParams.plan ?? "all";
  const statusFilter = searchParams.status ?? "all";
  const query = (searchParams.search ?? "").trim().toLowerCase();
  const currentPage = Math.max(Number(searchParams.page ?? "1") || 1, 1);

  // Server-side filtering
  const filtered = MOCK_SUBSCRIPTIONS.filter((subscription) => {
    const matchesPlan = planFilter === "all" || subscription.plan === planFilter;
    const matchesStatus = statusFilter === "all" || subscription.status === statusFilter;
    const matchesQuery =
      !query ||
      subscription.userEmail.toLowerCase().includes(query);
    return matchesPlan && matchesStatus && matchesQuery;
  });

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Calculate stats
  const totalSubscriptions = filtered.length;
  const activeSubscriptions = filtered.filter((s) => s.status === "active").length;
  const cancelledSubscriptions = filtered.filter((s) => s.status === "cancelled").length;
  const expiredSubscriptions = filtered.filter((s) => s.status === "expired").length;

  return (
    <div className="space-y-6 -mt-12 md:-mt-20">
      {/* Section header with stats */}
      <div className="rounded-2xl border border-white/5 bg-[#0d1420] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Manage Subscriptions
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage user subscriptions, plans, and billing cycles
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 sm:mt-0">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-white">{totalSubscriptions}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Active</div>
              <div className="text-lg font-semibold text-[#05DF72]">
                {activeSubscriptions}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Cancelled</div>
              <div className="text-lg font-semibold text-[#FD0053]">
                {cancelledSubscriptions}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Expired</div>
              <div className="text-lg font-semibold text-[#828282]">
                {expiredSubscriptions}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters - ALL components using useSearchParams() must be wrapped */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-sm">
          {/* ✅ FIX: Wrap SearchParamsInput in Suspense */}
          <Suspense
            fallback={
              <div className="h-11 w-full animate-pulse rounded-lg bg-white/5" />
            }
          >
            <SearchParamsInput paramName="search" placeholder="Search by email..." />
          </Suspense>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Suspense
            fallback={
              <div className="h-11 w-40 animate-pulse rounded-lg bg-white/5" />
            }
          >
            <GlobalSelectFilter
              options={PLAN_OPTIONS}
              paramName="plan"
              defaultValue="all"
              placeholder="All Plans"
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-11 w-40 animate-pulse rounded-lg bg-white/5" />
            }
          >
            <GlobalSelectFilter
              options={STATUS_OPTIONS}
              paramName="status"
              defaultValue="all"
              placeholder="All Status"
            />
          </Suspense>
        </div>
      </div>

      {/* Table with Suspense */}
      <Suspense fallback={<SubscriptionTableSkeleton />}>
        <SubscriptionTable
          data={paged}
          totalItems={filtered.length}
        />
      </Suspense>

      {/* ✅ FIX: Wrap Pagination in Suspense */}
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