// UserTable.tsx
"use client";

import {
  DataTable,
  type DataTableAction,
  type DataTableColumn,
} from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import type { AdminUserRow } from "@/types/users.type";

interface UserTableProps {
  data: AdminUserRow[];
  totalItems: number;
}

const columns: DataTableColumn<AdminUserRow>[] = [
  {
    key: "user",
    header: "User",
    render: (row) => (
      <span className="font-semibold text-white">{row.name}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (row) => <span className="text-gray-300">{row.email}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "plan",
    header: "Subscriptions",
    render: (row) => (
      <span className="font-medium" style={{ color: "#3B9EFF" }}>
        {row.plan}
      </span>
    ),
  },
  {
    key: "lastLogin",
    header: "Last Login",
    render: (row) => <span className="text-gray-300">{row.lastLogin}</span>,
  },
];

// Only ban and unban actions
const actions: DataTableAction<AdminUserRow>[] = [
  {
    variant: "block", // or "block" if you have that variant
    label: () => "Ban",
    onClick: (row) => console.log("ban user", row.id),
    show: (row) => row.status === "active" || row.status === "trial" || row.status === "pending",
  },
  {
    variant: "unblock", // or "unblock" if you have that variant
    label: () => "Unban",
    onClick: (row) => console.log("unban user", row.id),
    show: (row) => row.status === "suspended" || row.status === "cancelled" || row.status === "expired",
  },
];

export function UserTable({ data, totalItems }: UserTableProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Showing {data.length} of {totalItems} users
      </div>
      <DataTable
        columns={columns}
        data={data}
        actions={actions}
        getRowId={(row) => row.id}
      />
    </div>
  );
}