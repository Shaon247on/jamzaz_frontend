"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Pencil, User } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(60, "Full name must be at most 60 characters."),
  email: z.string().email("Enter a valid email address."),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>
  onSave?: (values: ProfileFormValues) => void
}

export function ProfileForm({
  defaultValues = { fullName: "Plabon Saha", email: "sahaplabon66@gmail.com" },
  onSave,
}: ProfileFormProps) {
  const [isNameEditable, setIsNameEditable] = React.useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: defaultValues.fullName ?? "",
      email: defaultValues.email ?? "",
    },
  })

  function onSubmit(values: ProfileFormValues) {
    onSave?.(values)
    setIsNameEditable(false)
    toast("Profile updated", {
      description: "Your profile information has been saved.",
    })
  }

  return (
    <Card className="w-full rounded-2xl border-[3px] border-[#00EAFF] bg-[#0a0c10] shadow-[0_4px_18px_0_rgba(0,234,255,0.35)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <User className="size-5 text-[#00EAFF] drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]" />
          Profile information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-xl border border-dashed border-[#00EAFF]/40 p-4 sm:p-5"
        >
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-full-name">Full Name</FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupInput
                        {...field}
                        id="profile-full-name"
                        aria-invalid={fieldState.invalid}
                        readOnly={!isNameEditable}
                        autoComplete="off"
                        className={`${!isNameEditable ? "text-muted-foreground" : undefined}`}
                      />
                      <InputGroupAddon align="inline-end">
                        <button
                          type="button"
                          onClick={() => setIsNameEditable((prev) => !prev)}
                          aria-label={isNameEditable ? "Lock name field" : "Edit name field"}
                          className="text-muted-foreground transition-colors hover:text-[#00EAFF]"
                        >
                          <Pencil className="size-4" />
                        </button>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="profile-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      disabled
                      className="disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-muted-foreground disabled:opacity-100 h-10"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <div className="mt-4 flex justify-end">
            <Button type="submit" form="profile-form" variant="cyan" size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}