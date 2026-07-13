import { Suspense } from "react"
import { ActiveLogSection } from "@/components/dashboard/user/activeLog/ActiveLogSection"
import { ActiveLogSkeleton } from "@/components/dashboard/user/activeLog/ActiveLogSkeletont"

export default function ActiveLogPage() {
  return (
    <Suspense fallback={<ActiveLogSkeleton/>}>
      <ActiveLogSection />
    </Suspense>
  )
}