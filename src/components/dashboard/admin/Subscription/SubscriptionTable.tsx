// SubscriptionTable.tsx
"use client";

import {
  DataTable,
  type DataTableAction,
  type DataTableColumn,
} from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import type { SubscriptionRow } from "@/types/subscription.type";

interface SubscriptionTableProps {
  data: SubscriptionRow[];
  totalItems: number;
}

const columns: DataTableColumn<SubscriptionRow>[] = [
  {
    key: "userEmail",
    header: "User Email",
    render: (row) => (
      <span className="font-medium text-white">{row.userEmail}</span>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    render: (row) => (
      <span className="text-[#3B9EFF] font-medium">{row.plan}</span>
    ),
  },
  {
    key: "billingCycle",
    header: "Billing Cycle",
    render: (row) => (
      <span className="text-gray-300">{row.billingCycle}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "startDate",
    header: "Start Date",
    render: (row) => (
      <span className="text-gray-300">{row.startDate}</span>
    ),
  },
];

export function SubscriptionTable({ data, totalItems }: SubscriptionTableProps) {
  // Only block and unblock actions
  const actions: DataTableAction<SubscriptionRow>[] = [
    {
      variant: "block",
      label: () => "Block",
      onClick: (row) => {
        console.log("Block subscription", row.id);
        // In a real app, this would call an API or server action
        // Example: await blockSubscription(row.id);
      },
      show: (row) => row.status === "active",
    },
    {
      variant: "unblock",
      label: () => "Unblock",
      onClick: (row) => {
        console.log("Unblock subscription", row.id);
        // In a real app, this would call an API or server action
        // Example: await unblockSubscription(row.id);
      },
      show: (row) => row.status === "cancelled" || row.status === "expired",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Showing {data.length} of {totalItems} subscriptions
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