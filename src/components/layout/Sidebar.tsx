"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import logo from "../../../public/assets/svg_logo.svg";
import { NavList } from "./NavList"; // Import the separate component

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1C292A] text-white p-6 min-h-screen sticky top-0 border-r border-white/5">
        <div className="mb-12">
          <Link href="/overview">
            <Image
              src={logo}
              width={168}
              height={68}
              alt="TrendBurst Logo"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1">
          <NavList pathname={pathname} />
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#1C292A] text-white p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                <Image src={logo} width={140} height={50} alt="Logo" />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1">
                <NavList
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