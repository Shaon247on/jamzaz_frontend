import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        // --- Neon variants -----------------------------------------------------
        // Transparent fill, thick colored border, matching text color and a soft
        // drop shadow glow in the same color. Hover/active states intensify the
        // glow slightly so the button reads as "alive" without changing shape.
        primary:
          "rounded-lg border-[3px] border-[#00EAFF] bg-transparent text-[#00EAFF] shadow-[0_4px_8.8px_0_rgba(0,234,255,0.65)] hover:bg-[#00EAFF]/10 hover:shadow-[0_4px_14px_0_rgba(0,234,255,0.9)] focus-visible:ring-[#00EAFF]/30 active:bg-[#00EAFF]/15",
        danger:
          "rounded-lg border-[3px] border-[#FF2D55] bg-transparent text-[#FF2D55] shadow-[0_4px_8.8px_0_rgba(255,45,85,0.65)] hover:bg-[#FF2D55]/10 hover:shadow-[0_4px_14px_0_rgba(255,45,85,0.9)] focus-visible:ring-[#FF2D55]/30 active:bg-[#FF2D55]/15",
        approve:
          "rounded-lg border-[3px] border-[#39FF14] bg-transparent text-[#39FF14] shadow-[0_4px_8.8px_0_rgba(57,255,20,0.65)] hover:bg-[#39FF14]/10 hover:shadow-[0_4px_14px_0_rgba(57,255,20,0.9)] focus-visible:ring-[#39FF14]/30 active:bg-[#39FF14]/15",
        // Solid CTA variant — filled gradient (rather than outline) for primary
        // actions like "View Product". Gradient echoes the same border/glow
        // family (cyan -> magenta) so it reads as part of the same system.
        pink: "rounded-lg border-transparent bg-gradient-to-r from-[#DF11EE] to-[#AF28F9] text-white shadow-[0_4px_8.8px_0_rgba(223,17,238,0.55)] hover:shadow-[0_4px_16px_0_rgba(223,17,238,0.85)] hover:brightness-110 focus-visible:ring-[#DF11EE]/30 active:brightness-95",
        // Same solid-gradient CTA treatment as `pink`, but cyan -> blue — for
        // primary confirm actions like "Save Changes".
        cyan: "rounded-lg border-transparent bg-gradient-to-r from-[#00EAFF] to-[#269BF9] text-white shadow-[0_4px_8.8px_0_rgba(0,234,255,0.55)] hover:shadow-[0_4px_16px_0_rgba(0,234,255,0.85)] hover:brightness-110 focus-visible:ring-[#00EAFF]/30 active:brightness-95",
      },
      size: {
        default:
          "h-7 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-6 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
        // Roomier size that matches the "View / Delete" pills in the reference design
        xl: "h-11 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }