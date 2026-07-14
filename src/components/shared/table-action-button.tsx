"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Ban, CheckCircle2, Eye, Pencil, Trash2, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const actionButtonVariants = cva(
  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all hover:brightness-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        view: "border-white/15 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200",
        edit: "border-[#05FBF34D] bg-[#05FBF31A] text-[#05FBF3] shadow-[0_0_10px_0_#05FBF34D]",
        block: "border-[#FB2C364D] bg-[#FB2C361A] text-[#FD0053] shadow-[0_0_10px_0_#FB2C364D]",
        unblock: "border-[#00C95080] bg-[#00C95033] text-[#05DF72] shadow-[0_0_10px_0_#22C55E4D]",
        delete: "border-[#FB2C364D] bg-[#FB2C361A] text-[#FD0053] shadow-[0_0_10px_0_#FB2C364D]",
      },
    },
    defaultVariants: { variant: "view" },
  }
)

const DEFAULT_ICONS: Record<string, LucideIcon> = {
  view: Eye,
  edit: Pencil,
  block: Ban,
  unblock: CheckCircle2,
  delete: Trash2,
}

export interface ActionButtonProps
  extends Omit<React.ComponentProps<"button">, "type">,
    VariantProps<typeof actionButtonVariants> {
  icon?: LucideIcon
  /** Accessible name — also used as the tooltip, e.g. "Block Sarah". */
  label: string
}

function ActionButton({ variant = "view", icon, label, className, ...props }: ActionButtonProps) {
  const Icon = icon ?? DEFAULT_ICONS[variant ?? "view"] ?? Eye

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(actionButtonVariants({ variant }), className)}
      {...props}
    >
      <Icon className="size-4" />
    </button>
  )
}

export { ActionButton, actionButtonVariants }