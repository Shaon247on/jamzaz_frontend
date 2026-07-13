/**
 * Success Page
 */

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CheckCircle size={64} className="mx-auto text-green-600" />
      </motion.div>

      <div>
        <h1 className="text-2xl font-bold">Success!</h1>
        <p className="text-gray-600 mt-2">
          Your account is now ready. Let&apos;s get started!
        </p>
      </div>

      <Button onClick={() => router.push("/overview")} className="w-full">
        Go to Dashboard
      </Button>
    </motion.div>
  );
}
