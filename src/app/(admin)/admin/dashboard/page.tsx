/**
 * Admin Dashboard Page
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";

const adminStats = [
  { label: "Total Users", value: "1,234", icon: Users, color: "text-blue-600" },
  {
    label: "Total Products",
    value: "5,678",
    icon: ShoppingCart,
    color: "text-green-600",
  },
  {
    label: "Active Trends",
    value: "45",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  { label: "Alerts", value: "12", icon: AlertCircle, color: "text-red-600" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System overview and management</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`${stat.color}`} size={32} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 rounded-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span>API Server</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Online
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span>Database</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Cache Service</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Running
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
