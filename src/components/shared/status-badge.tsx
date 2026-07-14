import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      status: {
        // --- Exact spec ---------------------------------------------------
        active: "border-[#00C95080] bg-[#00C95033] text-[#05DF72] shadow-[0_0_10px_0_#22C55E4D]",
        cancelled: "border-[#FB2C364D] bg-[#FB2C361A] text-[#FD0053] shadow-[0_0_10px_0_#FB2C364D]",
        expired: "border-[#82828280] bg-[#82828233] text-[#828282] shadow-[0_0_10px_0_#8282824D]",
        // --- Same recipe, extra states that tend to come up -----------------
        pending: "border-[#F59E0B80] bg-[#F59E0B33] text-[#FBBF24] shadow-[0_0_10px_0_#F59E0B4D]",
        suspended: "border-[#FF7A0080] bg-[#FF7A0033] text-[#FFA53D] shadow-[0_0_10px_0_#FF7A004D]",
        trial: "border-[#00D3F380] bg-[#00D3F333] text-[#00D3F3] shadow-[0_0_10px_0_#00D3F34D]",
      },
    },
    defaultVariants: { status: "active" },
  }
)

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  cancelled: "Cancel",
  expired: "Expired",
  pending: "Pending",
  suspended: "Suspended",
  trial: "Trial",
}

export interface StatusBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ status, className, children, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {children ?? STATUS_LABELS[status ?? "active"]}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }