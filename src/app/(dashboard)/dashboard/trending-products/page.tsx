"use client";

import { Suspense, useState } from "react";

import { SkeletonLoader } from "@/components/sections/SkeletonLoader";
import ProductCard, {
  ProductProps,
} from "@/components/dashboard/trendin- products/ProductCard";
import FilterSection from "@/components/dashboard/trendin- products/FilterSection";
import ProductNeonCard from "@/components/shared/ProductNeonCardProps";
import TrendingProductsSkeleton from "@/components/dashboard/trendin- products/TrendingProductsSkeleton";

const mockProducts: ProductProps[] = [
  {
    id: "01",
    name: "Airpods Pro",
    desc: "Wireless earbuds with active noise cancellation, clear sound, and seamless Apple connectivity.",
    image:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=500&auto=format&fit=crop", // Replace with your actual asset path
    platform: "Amazon",
    trend: "90%",
    views: "2.4k",
    saves: "1.1k",
    color: "#00f7ff", // Cyan glow
  },
  {
    id: "02",
    name: "Omega Planet Ocean",
    desc: "Luxury dive watch with stainless steel case, water resistance, and luminous hands—perfect for adventures.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=500&auto=format&fit=crop",
    platform: "eBay",
    trend: "40%",
    views: "3k",
    saves: "2.1k",
    color: "#ff00ff", // Magenta glow
  },
];

export default function TrendingProductsPage() {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonLoader count={6} />
      </div>
    );
  }

  return (
     <Suspense fallback={<TrendingProductsSkeleton/>}>
    <div className="min-h-screen bg-[#0a0c10] p-6 lg:p-10">
      {/* Header Info */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">
          Trending Products
        </h1>
        <p className="text-gray-400">Discover the top-performing products</p>
      </div>

      {/* 1. Filter Area */}
      <FilterSection />

      {/* 2. Cards Area - Responsive Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockProducts.map((product) => (
          <ProductNeonCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </Suspense>
  );
}
