export function SubscriptionTableSkeleton() {
  return (
    <div className="rounded-lg border border-white/5 bg-[#0d1420] p-4">
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded bg-white/5"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}