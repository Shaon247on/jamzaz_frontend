"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = ["Last 7 days", "Last 30 days", "This year"];

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
}

const activity: ActivityItem[] = [
  { id: "1", title: "New User Registered", subtitle: "Sarah K.", time: "2h Ago" },
  { id: "2", title: "Subscription Updated", subtitle: "Sarah K.", time: "3h Ago" },
  { id: "3", title: "Product Approved", subtitle: "Amazon, eBay", time: "4d Ago" },
  { id: "4", title: "New User Registered", subtitle: "John Doe", time: "5h Ago" },
];

export interface RecentActivityProps {
  items?: ActivityItem[];
}

export function RecentActivity({ items = activity }: RecentActivityProps) {
  const [sort, setSort] = React.useState(SORT_OPTIONS[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0a0f16] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white sm:text-sm"
          >
            Sort By: {sort}
            <ChevronDown className="size-3.5" />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-white/10 bg-[#111826] p-1 shadow-lg">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSort(option);
                    setIsOpen(false);
                  }}
                  className="w-full rounded-md px-2.5 py-1.5 text-left text-xs text-gray-300 hover:bg-white/5"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 divide-y divide-white/5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}