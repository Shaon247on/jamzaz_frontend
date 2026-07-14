// app/profile/PersonalInfoCard.tsx
"use client";

import { useState } from "react";
import { User, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PersonalInfoCardProps {
  fullName: string;
  email: string;
  onSave: (data: { fullName: string; email: string }) => void;
}

export function PersonalInfoCard({
  fullName: initialFullName,
  email,
  onSave,
}: PersonalInfoCardProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave({ fullName, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFullName(initialFullName);
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0d1420] p-6 transition-all hover:border-white/10">
      {/* Header with Icon */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DF11EE]/10 shadow-[0_4px_8.8px_0_rgba(223,17,238,0.55)]">
          <User className="h-5 w-5 text-[#DF11EE]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Personal Information</h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Full Name - with edit toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Full Name</label>
          <div className="relative">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "h-11 w-full rounded-lg border-border/60 bg-input/30 pr-12 text-white placeholder:text-muted-foreground transition-all",
                "focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30",
                !isEditing && "cursor-default opacity-90",
                isEditing && "border-[#00EAFF]/50 shadow-[0_0_15px_0_rgba(0,234,255,0.2)]"
              )}
              placeholder="Enter your full name"
            />
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 transition-all",
                "text-muted-foreground hover:bg-white/5 hover:text-white",
                isEditing && "text-[#00EAFF] hover:text-[#00EAFF]"
              )}
              aria-label={isEditing ? "Lock name" : "Edit name"}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
          {isEditing && (
            <p className="text-xs text-[#00EAFF]">
              Click the edit icon to toggle editing mode
            </p>
          )}
        </div>

        {/* Email - always disabled */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email Address</label>
          <Input
            value={email}
            disabled
            className="h-11 w-full cursor-not-allowed rounded-lg border-border/60 bg-input/20 text-gray-400 opacity-70"
            placeholder="Your email address"
          />
          <p className="text-xs text-muted-foreground">
            Email address cannot be changed
          </p>
        </div>
      </div>

      {/* Save Button - Bottom Right */}
      <div className="mt-6 flex justify-end gap-3">
        {isEditing && (
          <Button
            variant="ghost"
            size="xl"
            onClick={handleCancel}
            className="border border-border/60"
          >
            Cancel
          </Button>
        )}
        <Button
          variant="pink"
          size="xl"
          onClick={handleSave}
          className="min-w-[120px]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}