"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Bell } from "lucide-react"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

const notificationSchema = z.object({
  emailUpdates: z.boolean(),
})

export type NotificationFormValues = z.infer<typeof notificationSchema>

export interface NotificationCardProps {
  defaultValues?: Partial<NotificationFormValues>
  onChange?: (values: NotificationFormValues) => void
}

export function NotificationCard({
  defaultValues = { emailUpdates: true },
  onChange,
}: NotificationCardProps) {
  const { control, getValues } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: { emailUpdates: defaultValues.emailUpdates ?? true },
  })

  return (
    <Card className="w-full rounded-2xl border border-white/5 bg-[#0a0c10]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <Bell className="size-5 text-[#00EAFF] drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" />
          Notification
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Controller
          name="emailUpdates"
          control={control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <div className="space-y-1">
                <FieldLabel htmlFor="notification-email-updates">Email Updates</FieldLabel>
                <FieldDescription>
                  Receive notifications about new trending products
                </FieldDescription>
              </div>
              <Switch
                id="notification-email-updates"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked)
                  onChange?.({ ...getValues(), emailUpdates: checked })
                  toast(checked ? "Email updates enabled" : "Email updates disabled")
                }}
              />
            </Field>
          )}
        />
      </CardContent>
    </Card>
  )
}