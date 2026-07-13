// components/dashboard/NavList.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Heart,
  Activity,
  Settings,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: BarChart3 },
  { label: "Trending Products", href: "/dashboard/trending-products", icon: TrendingUp },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Activity Logs", href: "/dashboard/activity-logs", icon: Activity },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface NavListProps {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function NavList({ pathname, mobile = false, onNavigate }: NavListProps) {
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/dashboard");

  return (
    <ul className="space-y-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <motion.li
            key={item.href}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={item.href}
              onClick={() => mobile && onNavigate?.()}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
                active
                  ? "border-[#00EAFF] text-[#00EAFF] bg-[#00EAFF]/5 shadow-[0_0_20px_rgba(0,234,255,0.3),inset_0_0_10px_rgba(0,234,255,0.2)]"
                  : "border-transparent text-white hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <Icon
                size={22}
                className={
                  active ? "drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" : ""
                }
              />
              <span
                className={`font-medium whitespace-nowrap ${active ? "tracking-wide" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}