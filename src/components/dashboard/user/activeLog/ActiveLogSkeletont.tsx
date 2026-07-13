import { ListingSkeleton } from "@/components/shared/ListingSkeleton";

export interface ActiveLogSkeletonProps {
  count?: number;
}

/** Loading state for the active log section — each card shows a single View slot. */
export function ActiveLogSkeleton({ count = 3 }: ActiveLogSkeletonProps) {
  return <ListingSkeleton count={count} showDelete={false} filterCount={4} />;
}
