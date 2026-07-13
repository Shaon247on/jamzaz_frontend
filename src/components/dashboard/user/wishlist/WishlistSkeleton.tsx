import { ListingSkeleton } from "@/components/shared/ListingSkeleton"

export interface WishlistSkeletonProps {
  count?: number
}

/** Loading state for the wishlist section — each card shows View + Delete slots. */
export function WishlistSkeleton({ count = 3 }: WishlistSkeletonProps) {
  return <ListingSkeleton count={count} showDelete filterCount={4} />
}