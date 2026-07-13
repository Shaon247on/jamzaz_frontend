
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { ProductsSection } from "@/components/public/home/ProductsSection";
import { ProductInsightsSection } from "@/components/public/home/ProductInsightsSection";
import { insightBlocksData } from "@/data/insightBlocksData";
import img1 from "../../../public/assets/pablic_assetes/home/image_1.png";
import img2 from "../../../public/assets/pablic_assetes/home/image_2.png";
import img3 from "../../../public/assets/pablic_assetes/home/image_3.png";
import img4 from "../../../public/assets/pablic_assetes/home/image_4.png";
import img5 from "../../../public/assets/pablic_assetes/home/image_5.png";
import { CTASection } from "@/components/public/home/CTASection";
import { FeaturesGridSection } from "@/components/public/home/FeaturesGridSection";
import { HeroSection } from "@/components/public/home/HeroSection";

// Sample products - Replace these with your actual product images
const myProducts = [
  {
    id: 1,
    image: img1,
    alt: "Product 1",
  },
  {
    id: 2,
    image: img2,
    alt: "Product 2",
  },
  {
    id: 3,
    image: img3,
    alt: "Product 3",
  },
  {
    id: 4,
    image: img4,
    alt: "Product 4",
  },
  {
    id: 5,
    image: img5,
    alt: "Product 5",
  },
];

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Trends",
    description: "Track trending products and market movements as they happen",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Your data is encrypted and protected with enterprise-grade security",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Experience blazing-fast performance and instant notifications",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-full">
      <HeroSection />
      <ProductsSection products={myProducts} />
      <ProductInsightsSection blocks={insightBlocksData} />
      <CTASection />
      <FeaturesGridSection />
      {/* Hero Section */}
      {/* <section className="min-h-[90vh] flex items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              Welcome to TrendBurst
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Discover Trending{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Stay ahead of the market with real-time trend tracking. Discover
            what's trending before everyone else.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => router.push("/signup")}>
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/features")}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </section> */}

      {/* Features Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose TrendBurst?</h2>
            <p className="text-gray-600 text-lg">
              Everything you need to track and discover trending products
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="text-blue-600 mb-4" size={40} />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of users tracking trends and discovering
            opportunities
          </p>
          <Button size="lg" onClick={() => router.push("/signup")}>
            Create Free Account
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </section> */}
    </div>
  );
}
