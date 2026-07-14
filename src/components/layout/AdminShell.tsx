"use client";

import { ReactNode, useState } from "react";

import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-start bg-[#0D181B]">
      <AdminSidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AdminHeader onOpenMobileMenu={() => setIsSidebarOpen(true)} />

        <main className="w-full flex-1 p-4 md:p-8 relative z-10">{children}</main>
      </div>
    </div>
  );
}
