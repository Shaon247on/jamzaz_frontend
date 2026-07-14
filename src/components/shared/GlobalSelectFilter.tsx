// app/components/shared/GlobalSelectFilter.tsx
"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectFilterOption {
  label: string;
  /** Value written to the URL search param when this option is active. */
  value: string;
}

export interface GlobalSelectFilterProps {
  options: SelectFilterOption[];
  /** The URL search param this filter reads from / writes to. */
  paramName?: string;
  /** The option value treated as "no filter" — removed from the URL instead of set. */
  defaultValue?: string;
  /** Reset this param (e.g. "page") whenever the filter changes. */
  resetParamName?: string;
  /** Placeholder text shown when no selection is made */
  placeholder?: string;
  className?: string;
}

/**
 * Global select filter. Renders a shadcn Select dropdown that updates
 * URL search params, making filtering shareable and SSR-friendly.
 * Features pink theming with #0D1420 background and glow effects.
 */
export function GlobalSelectFilter({
  options,
  paramName = "filter",
  defaultValue = "all",
  resetParamName = "page",
  placeholder = "Filter by...",
  className,
}: GlobalSelectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeValue = searchParams.get(paramName) ?? defaultValue;

  function handleSelect(value: string) {
    if (value === activeValue) return;

    const params = new URLSearchParams(searchParams.toString());
    if (value === defaultValue) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
    if (resetParamName) params.delete(resetParamName);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  // Find the current label for display
  const currentOption = options.find((opt) => opt.value === activeValue);
  const displayValue = currentOption?.label || placeholder;

  return (
    <Select value={activeValue} onValueChange={handleSelect}>
      <SelectTrigger
        className={cn(
          "h-11 min-w-40 rounded-lg border-2 border-[#DF11EE] bg-[#0D1420] px-3 text-[#DF11EE] transition-all duration-300",
          "shadow-[0_4px_8.8px_0_rgba(223,17,238,0.55)] hover:shadow-[0_4px_14px_0_rgba(223,17,238,0.9)]",
          "hover:bg-[#0D1420] hover:border-[#DF11EE] focus:ring-[#DF11EE]/30",
          "data-placeholder:text-[#DF11EE]",
          className,
        )}
      >
        <SelectValue placeholder={placeholder}>{displayValue}</SelectValue>
      </SelectTrigger>
      <SelectContent
        className="border-2 border-[#DF11EE] bg-[#0D1420] text-white shadow-[0_4px_8.8px_0_rgba(223,17,238,0.55)]"
        position="popper"
        sideOffset={4}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={cn(
              "cursor-pointer text-white transition-all duration-200",
              "hover:bg-[#DF11EE] hover:text-white hover:shadow-[0_4px_14px_0_rgba(223,17,238,0.9)]",
              "focus:bg-[#DF11EE] focus:text-white",
              "data-highlighted:bg-[#DF11EE] data-highlighted:text-white data-highlighted:shadow-[0_4px_14px_0_rgba(223,17,238,0.9)]",
              activeValue === option.value && "bg-[#DF11EE] text-white shadow-[0_4px_14px_0_rgba(223,17,238,0.9)]",
            )}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}