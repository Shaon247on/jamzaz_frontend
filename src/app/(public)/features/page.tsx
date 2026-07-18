/**
 * Features Page
 */

"use client";

import { FeaturesHeroSection } from "@/components/public/features/FeaturesHeroSection";
import { CoreFeaturesSection } from "@/components/public/features/CoreFeaturesSection";
import { SupportedPlatformsSection } from "@/components/public/features/SupportedPlatformsSection";
import {
  HowItWorksSection,
  WorkStep,
} from "@/components/public/features/HowItWorksSection";

import walmartLogo from "../../../../public/assets/pablic_assetes/fetures/platform1.png";
import amazonLogo from "../../../../public/assets/pablic_assetes/fetures/platform2.png";
import ebayLogo from "../../../../public/assets/pablic_assetes/fetures/ebay.png";
import { ShoppingBag, Search, Zap } from "lucide-react";
import { FeaturesCtaSection } from "@/components/public/features/FeaturesCtaSection";

const featureList = [
  "Real-time product trend tracking",
  "Customizable watchlists and alerts",
  "Detailed product analytics",
  "Price history and comparisons",
  "Community insights and reviews",
  "Advanced filtering and search",
  "Mobile app support",
  "API access",
];

const platforms = [
  {
    id: 1,
    image: walmartLogo,
    alt: "Walmart Logo",
    title: "Walmart",
    description:
      "Connect your store data to explore product trends, performance stats, and market movement in one place.",
  },
  {
    id: 2,
    image: amazonLogo,
    alt: "Amazon Logo",
    title: "Amazon",
    description:
      "Analyze product performance, pricing behavior, and competitive signals across a large-scale marketplace.",
  },
  {
    id: 3,
    image: ebayLogo,
    alt: "Ebay Logo",
    title: "Ebay",
    description:
      "Discover listing performance, pricing data, and demand patterns from an active resale marketplace.",
  },
];

const steps: WorkStep[] = [
  {
    id: 1,
    number: "01",
    icon: <ShoppingBag size={24} />,
    title: "Subscribe",
    description:
      "Select a subscription plan that fits your business needs and gain instant access.",
    color: "cyan",
  },
  {
    id: 2,
    number: "02",
    icon: <Search size={24} />,
    title: "Analyze Products",
    description:
      "Get real-time insights, trend detection, and performance data across all platforms.",
    color: "green",
  },
  {
    id: 3,
    number: "03",
    icon: <Zap size={24} />,
    title: "Purchase If Interested",
    description:
      "Buy products directly from marketplaces after making informed decisions.",
    color: "purple",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHeroSection />
      <CoreFeaturesSection />
      <SupportedPlatformsSection platforms={platforms} />
      <HowItWorksSection steps={steps} />
      <FeaturesCtaSection></FeaturesCtaSection>
    </>
  );
}
