export interface SubscriptionRow {
  id: string;
  userEmail: string;
  plan: string;
  billingCycle: string;
  status: "active" | "cancelled" | "expired";
  startDate: string;
}