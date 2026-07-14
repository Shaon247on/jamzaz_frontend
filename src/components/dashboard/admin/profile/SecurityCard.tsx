// app/profile/SecurityCard.tsx
"use client";

import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SecurityCardProps {
  onChangePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => void;
}

export function SecurityCard({ onChangePassword }: SecurityCardProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    retypePassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!retypePassword) {
      newErrors.retypePassword = "Please retype your new password";
    } else if (newPassword && retypePassword !== newPassword) {
      newErrors.retypePassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onChangePassword({
        currentPassword,
        newPassword,
      });
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setRetypePassword("");
      setErrors({});
    }
  };

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "retype":
        setShowRetypePassword(!showRetypePassword);
        break;
    }
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0d1420] p-6 transition-all hover:border-white/10">
      {/* Header with Icon */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00EAFF]/10 shadow-[0_4px_8.8px_0_rgba(0,234,255,0.55)]">
          <Shield className="h-5 w-5 text-[#00EAFF]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Security</h2>
      </div>

      {/* Password Fields */}
      <div className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (errors.currentPassword) {
                  setErrors({ ...errors, currentPassword: undefined });
                }
              }}
              className={cn(
                "h-11 w-full rounded-lg border-border/60 bg-input/30 pr-12 text-white placeholder:text-muted-foreground",
                "focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30",
                errors.currentPassword && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-xs text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) {
                  setErrors({ ...errors, newPassword: undefined });
                }
              }}
              className={cn(
                "h-11 w-full rounded-lg border-border/60 bg-input/30 pr-12 text-white placeholder:text-muted-foreground",
                "focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30",
                errors.newPassword && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* Retype New Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Retype New Password
          </label>
          <div className="relative">
            <Input
              type={showRetypePassword ? "text" : "password"}
              value={retypePassword}
              onChange={(e) => {
                setRetypePassword(e.target.value);
                if (errors.retypePassword) {
                  setErrors({ ...errors, retypePassword: undefined });
                }
              }}
              className={cn(
                "h-11 w-full rounded-lg border-border/60 bg-input/30 pr-12 text-white placeholder:text-muted-foreground",
                "focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30",
                errors.retypePassword && "border-red-500 focus-visible:border-red-500"
              )}
              placeholder="Retype your new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("retype")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
              aria-label={showRetypePassword ? "Hide password" : "Show password"}
            >
              {showRetypePassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.retypePassword && (
            <p className="text-xs text-red-500">{errors.retypePassword}</p>
          )}
        </div>
      </div>

      {/* Change Password Button - Bottom Right */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="cyan"
          size="xl"
          onClick={handleSubmit}
          className="min-w-[160px]"
        >
          <Shield className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </div>
    </div>
  );
}