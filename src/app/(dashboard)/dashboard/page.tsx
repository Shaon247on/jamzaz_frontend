/**
 * Overview Page
 * Dashboard home page - Responsive Grid Layout
 */

"use client";

import { CategoryVelocity } from "@/components/dashboard/overview/CategoryVelocity";
import { DashboardAnalytics } from "@/components/dashboard/overview/DashboardAnalytics";
import { MarketOverviewCards } from "@/components/dashboard/overview/MarketOverviewCards";
import { ProductPriceMovement } from "@/components/dashboard/overview/ProductPriceMovement";
import { TrendingVelocitySection } from "@/components/dashboard/overview/TrendingVelocitySection";

export default function OverviewPage() {
  return (
    <div className="w-full min-h-screen p-2 md:p-6">
      {/* Grid logic: 
          - 1 column on mobile (grid-cols-1)
          - 2 columns on extra-large screens (xl:grid-cols-2)
          - items-start ensures they align at the top
      */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start max-w-[1600px] mx-auto">
        {/* Left Section: Trending Velocity */}
        <div className="w-full flex justify-center">
          <TrendingVelocitySection />
        </div>

        {/* Right Section: Analytics & Bar Charts */}
        <div className="w-full flex justify-center">
          <DashboardAnalytics />
        </div>
      </div>
      <ProductPriceMovement></ProductPriceMovement>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center max-w-[1600px] mx-auto min-h-100 bg-[#020606] rounded-[32px] p-6 mt-10 ">
        {/* Left Section: Trending Velocity */}
        <div className="w-full flex justify-center ">
          <CategoryVelocity></CategoryVelocity>
        </div>

        {/* Right Section: Analytics & Bar Charts */}
        <div className="w-full flex justify-center">
          <MarketOverviewCards></MarketOverviewCards>
        </div>
      </div>
    </div>
  );
}
