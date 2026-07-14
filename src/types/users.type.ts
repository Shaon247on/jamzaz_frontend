import type { StatusBadgeProps } from "@/components/shared/status-badge";

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  status: NonNullable<StatusBadgeProps["status"]>;
  plan: string;
  lastLogin: string;
}