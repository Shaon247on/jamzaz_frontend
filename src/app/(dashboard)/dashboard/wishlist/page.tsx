import { Suspense } from "react"
import { ProductListingSection } from "@/components/dashboard/user/wishlist/WishList"
import { WishlistSkeleton } from "@/components/dashboard/user/wishlist/WishlistSkeleton"
 
export default function ListingsPage() {
  return (
    <Suspense fallback={<WishlistSkeleton/>}>
      <ProductListingSection />
    </Suspense>
  )
}
 