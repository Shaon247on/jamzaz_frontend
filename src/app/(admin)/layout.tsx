import { ReactNode } from "react";

import { AdminShell } from "@/components/layout/AdminShell";

// No "use client" — stays a Server Component so it can host metadata /
// server-side role checks later without touching AdminShell.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}