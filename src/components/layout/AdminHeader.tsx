"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";

import { ADMIN_PAGE_TITLES } from "./AdminNavItem";
import { HEADER_GRADIENT_STOPS, toCssGradient } from "./chart-gradients";

export interface AdminHeaderProps {
  onOpenMobileMenu?: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = ADMIN_PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="relative isolate overflow-hidden py-10">
      {/*
        Blurred gradient glow — a larger-than-the-header gradient layer with
        a very heavy blur, so the colors read as a soft ambient wash behind
        the (crisp, unblurred) title/actions rather than a hard-edged bar.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-32 -z-10"
        style={{
          background: toCssGradient(HEADER_GRADIENT_STOPS, "120deg"),
          filter: "blur(286.67px)",
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open menu"
            className="flex size-10 items-center justify-center rounded-xl bg-black/20 text-white backdrop-blur-sm lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="text-xl font-bold text-white sm:text-3xl">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-black/20 py-1.5 pl-1.5 pr-3 backdrop-blur-sm">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold text-white">
              A
            </div>
            <span className="hidden text-sm font-medium text-white sm:inline">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
