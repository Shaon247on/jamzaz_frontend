import { ProfileForm } from "@/components/dashboard/user/settings/ProfileForm"
import { SecurityForm } from "@/components/dashboard/user/settings/SecurityForm"
import { SubscriptionCard } from "@/components/dashboard/user/settings/SubscriptionCard"
import { NotificationCard } from "@/components/dashboard/user/settings/NotificationCard"

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Account</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile and subscription
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        {/* Left column */}
        <div className="space-y-6">
          <ProfileForm />
          <SecurityForm />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <SubscriptionCard />
          <NotificationCard />
        </div>
      </div>
    </div>
  )
}