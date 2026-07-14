
"use client";
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

export default function HomePage() {

  return (
    <div className="w-full">
      <HeroSection />
      <ProductsSection products={myProducts} />
      <ProductInsightsSection blocks={insightBlocksData} />
      <CTASection />
      <FeaturesGridSection />
    </div>
  );
}
