import SubscriptionManagementSection from "@/components/dashboard/admin/Subscription/SubscriptionManagementSection";

interface PageProps {
  searchParams: {
    plan?: string;
    status?: string;
    search?: string;
    page?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  return <SubscriptionManagementSection searchParams={searchParams} />;
}

export const metadata = {
  title: "Manage Subscriptions",
};
