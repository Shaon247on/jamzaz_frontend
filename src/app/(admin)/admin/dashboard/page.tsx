import { StatCard } from "@/components/dashboard/admin/overview/StatCard";
import { RevenueTrendChart } from "@/components/dashboard/admin/overview/RevenueTrendChart";
import { UsersBarChart } from "@/components/dashboard/admin/overview/UsersBarChart";
import { RecentActivity } from "@/components/dashboard/admin/overview/RecentActivity";

const stats = [
  {
    title: "Total Revenue",
    value: "₹15,00,000",
    trend: { direction: "up" as const, value: "4.8%", label: "from last month" },
    sparkline: [40, 55, 35, 60, 50, 70, 65, 80],
  },
  {
    title: "Total Products",
    value: "7,506",
    trend: { direction: "down" as const, value: "3.5%", label: "from last week" },
    sparkline: [60, 50, 55, 45, 50, 40, 45, 42],
  },
  {
    title: "Total Clicks",
    value: "17,058",
    trend: { direction: "up" as const, value: "9.3%", label: "from yesterday" },
    sparkline: [30, 45, 40, 60, 55, 75, 70, 90],
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6  -mt-12 md:-mt-20">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <RevenueTrendChart />
        <UsersBarChart />
      </div>

      <RecentActivity />
    </div>
  );
}