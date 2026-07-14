"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import {
  ADMIN_NAV_ITEMS,
  CURRENT_ADMIN_ROLE,
  type AdminNavItem,
} from "./AdminNavItem";

interface AdminSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

interface NavListProps {
  items: AdminNavItem[];
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

// Declared outside AdminSidebar so it's a stable component reference across
// renders (defining it inline would remount the whole list on every render).
function NavList({ items, pathname, mobile = false, onNavigate }: NavListProps) {
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <ul className="space-y-4">
      {items.map((item) => {
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
                className={active ? "drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" : ""}
              />
              <span className={`font-medium whitespace-nowrap ${active ? "tracking-wide" : ""}`}>
                {item.label}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}

export function AdminSidebar({ isMobileOpen, setIsMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  // Swap CURRENT_ADMIN_ROLE (or wire it to real auth) and these links update.
  const navItems = ADMIN_NAV_ITEMS[CURRENT_ADMIN_ROLE] ?? ADMIN_NAV_ITEMS.admin;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1C292A] text-white p-6 min-h-screen sticky top-0 border-r border-white/5">
        <div className="mb-12">
          <Link href="/admin">
            <Image src={"/assets/svg_logo.svg"} width={168} height={68} alt="TrendBurst Logo" priority />
          </Link>
        </div>

        <nav className="flex-1">
          <NavList items={navItems} pathname={pathname} />
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 mt-auto rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all border-2 border-transparent"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Mobile Sidebar (Overlay & Drawer) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#1C292A] text-white p-6 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                <Image src={"/assets/svg_logo.svg"} width={140} height={50} alt="Logo" />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1">
                <NavList
                  items={navItems}
                  pathname={pathname}
                  mobile
                  onNavigate={() => setIsMobileOpen(false)}
                />
              </nav>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-auto rounded-xl text-red-400 bg-red-500/10"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}