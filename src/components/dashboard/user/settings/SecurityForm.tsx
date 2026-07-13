"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Eye, EyeOff, Shield } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  })

export type PasswordFormValues = z.infer<typeof passwordSchema>

export interface SecurityFormProps {
  onChangePassword?: (values: PasswordFormValues) => void
}

function PasswordField({
  id,
  label,
  field,
  fieldState,
}: {
  id: string
  label: string
  field: { value: string; onChange: (...args: unknown[]) => void; onBlur: () => void; name: string; ref: React.Ref<HTMLInputElement> }
  fieldState: { invalid: boolean; error?: { message?: string } }
}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup className="h-10">
        <InputGroupInput
          {...field}
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={fieldState.invalid}
          autoComplete="off"
        />
        <InputGroupAddon align="inline-end">
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="text-muted-foreground transition-colors hover:text-[#00EAFF]"
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </InputGroupAddon>
      </InputGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}

export function SecurityForm({ onChangePassword }: SecurityFormProps) {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  })

  function onSubmit(values: PasswordFormValues) {
    onChangePassword?.(values)
    form.reset()
    toast("Password updated", {
      description: "Your password has been changed successfully.",
    })
  }

  return (
    <Card className="w-full rounded-2xl border border-white/5 bg-[#0a0c10]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <Shield className="size-5 text-[#00EAFF] drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" />
          Security
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form id="security-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <PasswordField
                  id="security-current-password"
                  label="Current Password"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <PasswordField
                  id="security-new-password"
                  label="New Password"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
          </FieldGroup>

          <div className="mt-5 flex justify-end">
            <Button type="submit" form="security-form" variant="primary" size="lg">
              Change Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}