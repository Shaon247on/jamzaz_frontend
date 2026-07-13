"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface SearchParamsInputProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  /** The URL search param this input reads from / writes to. */
  paramName?: string
  /** Debounce delay (ms) before the URL is updated while typing. */
  debounceMs?: number
  /** Reset this param (e.g. "page") whenever the search value changes. */
  resetParamName?: string
  containerClassName?: string
}

/**
 * Global search input. Reflects and updates `?search=` (or a custom param
 * name) in the URL, so the value survives refreshes/back-forward nav and can
 * be read server-side via `searchParams`.
 */
export function SearchParamsInput({
  paramName = "search",
  debounceMs = 400,
  resetParamName = "page",
  placeholder = "Search here",
  className,
  containerClassName,
  ...props
}: SearchParamsInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, setValue] = React.useState(searchParams.get(paramName) ?? "")

  // Keep local state in sync if the URL changes from elsewhere (back/forward nav).
  React.useEffect(() => {
    setValue(searchParams.get(paramName) ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get(paramName)])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get(paramName) ?? ""
      if (current === value) return

      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(paramName, value)
      } else {
        params.delete(paramName)
      }
      if (resetParamName) params.delete(resetParamName)

      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname)
    }, debounceMs)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-lg border-border/60 bg-input/30 pr-10 text-sm placeholder:text-muted-foreground focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30",
          className
        )}
        {...props}
      />
      <Search className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}