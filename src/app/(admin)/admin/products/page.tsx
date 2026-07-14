import ProductManagementSection from "@/components/dashboard/admin/products/ProductManagementSection";

interface PageProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  return <ProductManagementSection searchParams={searchParams} />;
}

export const metadata = {
  title: "Product Management",
};
