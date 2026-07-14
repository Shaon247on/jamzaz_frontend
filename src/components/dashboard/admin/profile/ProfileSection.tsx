"use client";

import { useState } from "react";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { SecurityCard } from "./SecurityCard";

export default function ProfileSection() {
  // In a real app, this would come from your auth/user context
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
  });

  const handleSavePersonalInfo = (data: {
    fullName: string;
    email: string;
  }) => {
    console.log("Saving personal info:", data);
    setUserData(data);
    // In a real app, you'd call an API or server action here
  };

  const handleChangePassword = (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    console.log("Changing password:", data);
    // In a real app, you'd call an API or server action here
  };

  return (
    <div className="-mt-12 md:-mt-20">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="rounded-2xl border border-white/5 bg-[#0d1420] p-6">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information and security preferences
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Personal Information Card */}
          <PersonalInfoCard
            fullName={userData.fullName}
            email={userData.email}
            onSave={handleSavePersonalInfo}
          />

          {/* Security Card */}
          <SecurityCard onChangePassword={handleChangePassword} />
        </div>
      </div>
    </div>
  );
}
