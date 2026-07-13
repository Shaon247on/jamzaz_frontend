/**
 * Admin Users Page
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Shield } from "lucide-react";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    joinDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    joinDate: "2024-01-01",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-700 mt-2">Manage all platform users</p>
      </motion.div>

      <motion.div
        className="bg-gray-400 rounded-lg overflow-hidden shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full">
          <thead className="bg-gray-400 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                className="border-b hover:bg-gray-800 transition-colors"
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
              >
                <td className="px-6 py-4">
                  <p className="font-semibold">{user.name}</p>
                </td>
                <td className="px-6 py-4 flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role === "admin" && <Shield size={12} />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
