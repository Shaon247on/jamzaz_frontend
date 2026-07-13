import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// Same gradient/glow tokens as NeonCard, dimmed down since nothing is "live" yet.
const GRADIENT_BORDER =
  "linear-gradient(90deg, #00EAFF 0%, #269BF9 25%, #5B5DF9 50%, #AF28F9 75%, #DF11EE 100%)"

const GRADIENT_GLOW = [
  "0 4px 13.9px 0 rgba(0,234,255,0.16)",
  "0 4px 13.9px 0 rgba(38,155,249,0.12)",
  "0 4px 13.9px 0 rgba(91,93,249,0.12)",
  "0 4px 13.9px 0 rgba(175,40,249,0.12)",
  "0 4px 13.9px 0 rgba(223,17,238,0.16)",
].join(", ")

export interface NeonCardSkeletonProps {
  /** Render one action-button placeholder (View) or two (View + Delete). */
  showDelete?: boolean
  className?: string
}

/**
 * Loading placeholder matching NeonCard's exact layout (gradient border,
 * thumbnail, three text lines, action buttons) so content doesn't jump
 * around once the real card mounts.
 */
export function NeonCardSkeleton({ showDelete = true, className }: NeonCardSkeletonProps) {
  return (
    <div
      className={cn("rounded-2xl p-px", className)}
      style={{ background: GRADIENT_BORDER, boxShadow: GRADIENT_GLOW }}
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-[#0B0F19] p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <div className="flex items-center gap-4 sm:flex-1 sm:gap-5">
          <Skeleton className="size-16 shrink-0 rounded-xl bg-white/10 sm:size-20" />

          <div className="min-w-0 flex-1 space-y-2.5">
            <Skeleton className="h-5 w-3/4 max-w-56 bg-white/10" />
            <Skeleton className="h-4 w-20 bg-white/10" />
            <Skeleton className="h-3 w-28 bg-white/10" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Skeleton className="h-11 w-full min-w-24 rounded-lg bg-white/10 sm:w-28" />
          {showDelete && (
            <Skeleton className="h-11 w-full min-w-24 rounded-lg bg-white/10 sm:w-28" />
          )}
        </div>
      </div>
    </div>
  )
}