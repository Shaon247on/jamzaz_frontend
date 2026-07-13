import * as React from "react";
import { ExternalLink, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Matches the reference design's border sweep: cyan -> blue -> indigo -> purple -> magenta.
const GRADIENT_BORDER =
  "linear-gradient(90deg, #00EAFF 0%, #269BF9 25%, #5B5DF9 50%, #AF28F9 75%, #DF11EE 100%)";

// Soft multi-color glow that echoes the same gradient stops.
const GRADIENT_GLOW = [
  "0 4px 13.9px 0 rgba(0,234,255,0.28)",
  "0 4px 13.9px 0 rgba(38,155,249,0.22)",
  "0 4px 13.9px 0 rgba(91,93,249,0.22)",
  "0 4px 13.9px 0 rgba(175,40,249,0.22)",
  "0 4px 13.9px 0 rgba(223,17,238,0.28)",
].join(", ");

export interface NeonCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  platformName: string;
  /** Accent color for the platform label, e.g. "#FF3B30" for Amazon. */
  platformColor?: string;
  addedText: string;
  /** Show the "View" action. Defaults to true. */
  showView?: boolean;
  /** Show the "Delete" action. Defaults to true. */
  showDelete?: boolean;
  onView?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Global neon card. Wraps content in a 1px gradient "border" (a gradient
 * background showing through a small padding, with a solid panel on top),
 * plus a soft multi-color glow. Actions are optional so the same card works
 * for read-only listings, view-only, or view+delete rows.
 */
export function NeonCard({
  imageSrc,
  imageAlt,
  title,
  platformName,
  platformColor = "#00EAFF",
  addedText,
  showView = true,
  showDelete = true,
  onView,
  onDelete,
  className,
}: NeonCardProps) {
  const hasActions = showView || showDelete;

  return (
    <div
      className={cn("rounded-2xl p-px", className)}
      style={{ background: GRADIENT_BORDER, boxShadow: GRADIENT_GLOW }}
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-[#0B0F19] p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <div className="flex items-center gap-4 sm:flex-1 sm:gap-5">
          <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-white sm:size-20">
            <Image
              width={100}
              height={100}
              src={imageSrc}
              alt={imageAlt ?? title}
              className="size-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-white sm:text-lg">
              {title}
            </h3>
            <p
              className="mt-0.5 truncate text-sm font-semibold sm:text-base"
              style={{ color: platformColor }}
            >
              {platformName}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {addedText}
            </p>
          </div>
        </div>

        {hasActions && (
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            {showView && (
              <Button
                type="button"
                variant="primary"
                size="xl"
                onClick={onView}
                className="flex-1 sm:flex-none"
              >
                <ExternalLink /> View
              </Button>
            )}
            {showDelete && (
              <Button
                type="button"
                variant="danger"
                size="xl"
                onClick={onDelete}
                className="flex-1 sm:flex-none"
              >
                <Trash2 /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
