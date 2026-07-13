"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
// ✅ Import the Link component
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-cyan-500" size={40} />
      </div>
    );
  }

  // NOTE: Ensure your folder is named "admin" (not "(admin)")
  // for the /admin/ URLs to work.

  return (
    <div className="flex min-h-screen bg-black">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen sticky top-0">
        <h1 className="text-2xl font-bold mb-8 text-[#00D1FF]">Admin Panel</h1>

        <nav className="space-y-4">
          {/* ✅ Use Link for Dashboard */}
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded transition-colors hover:bg-gray-800"
          >
            Dashboard
          </Link>

          {/* ✅ Use Link for Users */}
          <Link
            href="/admin/users"
            className="block px-4 py-2 rounded transition-colors hover:bg-gray-800"
          >
            Users
          </Link>

          {/* ✅ Use Link for Content */}
          <Link
            href="/admin/content"
            className="block px-4 py-2 rounded transition-colors hover:bg-gray-800"
          >
            Content
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
