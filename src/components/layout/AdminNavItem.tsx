import { BarChart3, Home, LayoutGrid, Package, User, type LucideIcon } from "lucide-react"

export type AdminRole = "admin" | "moderator"

// Stand-in for real auth/role resolution — swap this for a value read from
// your auth/session once that's wired up (e.g. `session.user.role`).
export const CURRENT_ADMIN_ROLE: AdminRole = "admin"

export interface AdminNavItem {
  label: string
  href: string
  icon: LucideIcon
}

// One nav list per role. AdminSidebar just looks up CURRENT_ADMIN_ROLE here —
// change the constant above (or wire it to real auth) and the sidebar links
// update automatically.
export const ADMIN_NAV_ITEMS: Record<AdminRole, AdminNavItem[]> = {
  admin: [
    { label: "Overview", href: "/admin/dashboard", icon: Home },
    { label: "User Management", href: "/admin/users", icon: LayoutGrid },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Subscription", href: "/admin/subscription", icon: BarChart3 },
    { label: "Profile", href: "/admin/profile", icon: User },
  ],
  // Example of a narrower role — swap CURRENT_ADMIN_ROLE to "moderator" to see it.
  moderator: [
    { label: "Overview", href: "/admin", icon: Home },
    { label: "Product Management", href: "/admin/products", icon: Package },
    { label: "Profile", href: "/admin/profile", icon: User },
  ],
}

export const ADMIN_PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/users": "User Management",
  "/admin/products": "Product Management",
  "/admin/subscription": "Subscription",
  "/admin/profile": "Profile",
}