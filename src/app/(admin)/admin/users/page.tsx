import { Suspense } from "react";
import {
  FilterButtons,
  type FilterOption,
} from "@/components/shared/FilterButtons";
import { SearchParamsInput } from "@/components/shared/SearchParamsInput";
import { SearchParamsPagination } from "@/components/shared/SearchParamsPagination";
import { UserTable } from "@/components/dashboard/admin/users/UserTable";
import { UserTableSkeleton } from "@/components/dashboard/admin/users/UserTableSkeleton";
import type { AdminUserRow } from "@/types/users.type";

// --- Mock data (would be replaced with real fetch) -------------------------
const MOCK_USERS: AdminUserRow[] = [
  {
    id: "1",
    name: "Sarah",
    email: "sarah@example.com",
    status: "active",
    plan: "Starter",
    lastLogin: "2h ago",
  },
  {
    id: "2",
    name: "John",
    email: "john@example.com",
    status: "active",
    plan: "Starter (Add-ons)",
    lastLogin: "1d ago",
  },
  {
    id: "3",
    name: "Smith",
    email: "smith@example.com",
    status: "active",
    plan: "Starter",
    lastLogin: "3h ago",
  },
  {
    id: "4",
    name: "Josue",
    email: "josue@example.com",
    status: "active",
    plan: "Starter",
    lastLogin: "5d ago",
  },
  {
    id: "5",
    name: "Parker",
    email: "parker@example.com",
    status: "suspended",
    plan: "Professional",
    lastLogin: "2w ago",
  },
  {
    id: "6",
    name: "Johnathon",
    email: "johnathon@example.com",
    status: "active",
    plan: "Starter",
    lastLogin: "6h ago",
  },
  {
    id: "7",
    name: "Maria",
    email: "maria@example.com",
    status: "active",
    plan: "Professional",
    lastLogin: "10m ago",
  },
  {
    id: "8",
    name: "David",
    email: "david@example.com",
    status: "suspended",
    plan: "Starter",
    lastLogin: "Never",
  },
];

const FILTER_OPTIONS: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
];

const PAGE_SIZE = 5;

interface UserManagementSectionProps {
  searchParams: {
    status?: string;
    search?: string;
    page?: string;
  };
}

// MAIN SERVER COMPONENT
export default async function UserManagementSection({
  searchParams,
}: UserManagementSectionProps) {
  const statusFilter = searchParams.status ?? "all";
  const query = (searchParams.search ?? "").trim().toLowerCase();
  const currentPage = Math.max(Number(searchParams.page ?? "1") || 1, 1);

  // Server-side filtering
  const filtered = MOCK_USERS.filter((user) => {
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesQuery =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Calculate stats on the server
  const totalUsers = filtered.length;
  const activeUsers = filtered.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-6 -mt-14 md:-mt-20">
      {/* Section header with stats */}
      <div className="rounded-2xl border border-white/5 bg-[#0d1420] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              User Management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage all registered users, their subscriptions, and account status.
            </p>
          </div>
          <div className="mt-2 flex gap-4 sm:mt-0">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="text-lg font-semibold text-white">{totalUsers}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Active</div>
              <div className="text-lg font-semibold text-green-500">
                {activeUsers}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + status filter */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-sm">
          <SearchParamsInput paramName="search" placeholder="Search users..." />
        </div>
        <FilterButtons
          options={FILTER_OPTIONS}
          paramName="status"
          defaultValue="all"
        />
      </div>

      {/* Table with Suspense */}
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable data={paged} totalItems={filtered.length} />
      </Suspense>

      {/* Pagination */}
      <SearchParamsPagination totalPages={totalPages} paramName="page" />
    </div>
  );
}