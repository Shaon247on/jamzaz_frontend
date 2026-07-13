import * as React from "react"
import { Check, Database, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface SubscriptionCardProps {
  planName?: string
  price?: string
  onUpgrade?: () => void
}

export function SubscriptionCard({
  planName = "Starter Plan",
  price = "£10/month",
  onUpgrade,
}: SubscriptionCardProps) {
  return (
    <Card className="w-full rounded-2xl border border-white/5 bg-[#0a0c10]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <Database className="size-5 text-[#00EAFF] drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" />
          Subscription
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Active plan */}
        <div className="rounded-2xl border-2 border-[#00EAFF] p-5 shadow-[0_0_16px_rgba(0,234,255,0.25)]">
          <div className="flex items-center gap-2 text-[#00EAFF]">
            <Check className="size-4 drop-shadow-[0_0_6px_rgba(0,234,255,0.8)]" />
            <span className="font-semibold">{planName}</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{price}</p>
          <p className="mt-1 text-sm text-muted-foreground">Active subscription</p>
        </div>

        {/* Add-on upsell */}
        <div className="rounded-2xl border-2 border-[#DF11EE] p-5 shadow-[0_0_16px_rgba(223,17,238,0.25)]">
          <div className="flex items-center gap-2 text-[#DF11EE]">
            <Plus className="size-4 drop-shadow-[0_0_6px_rgba(223,17,238,0.8)]" />
            <span className="font-semibold">Category Add-On</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Unlock category filtering and per-category insights
          </p>
          <Button
            type="button"
            variant="pink"
            size="lg"
            className="mt-4 w-full sm:w-auto"
            onClick={onUpgrade}
          >
            Add for £5/mo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}