/**
 * Example data for Product Insights Section
 * Replace with your actual images and content
 */

import { InsightBlockProps } from "@/components/public/home/ProductInsightsSection";
import image1 from "../../public/assets/walmart.jpg";
import image2 from "../../public/assets/amazon.jpg";
import image3 from "../../public/assets/ebay.jpg";
import amazonSvg from "../../public/assets/pablic_assetes/home/amazan_svg.svg";

/**
 * Sample insight blocks data
 * Customize with your actual images and content
 */
export const insightBlocksData: InsightBlockProps[] = [
  {
    id: 1,
    image: image1,
    imageAlt: "Walmart Dashboard",
    title: "Inside Walmart",
    titleHighlight: "Walmart",
    titleHighlightColor: "text-blue-400",
    description:
      "Get in-depth insights into marketplace trends, overall platform performance, and the latest updates to stay ahead in the market.",
  },
  {
    id: 2,
    image: image2,
    imageAlt: "Amazon Analytics",
    title: "amazon in Motion",
    titleHighlight: "amazon",
    titleHighlightColor: "text-orange-400",
    logoSrc: amazonSvg,
    description:
      "Understand which products perform best, how pricing patterns change over time, and how overall market dynamics impact growth and competition.",
  },
  {
    id: 3,
    image: image3,
    imageAlt: "eBay Overview",
    title: "eBay Overview",
    titleHighlight: "eBay",
     titleHighlightColor: "text-[#0066CC]",
    description:
      "Analyze marketplace activity, pricing trends, and sales opportunities with comprehensive data visualization and detailed reporting.",
  },
];
