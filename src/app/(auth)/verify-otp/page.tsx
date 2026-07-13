/**
 * Verify OTP Page
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleVerifyOTP() {
    if (!email || !otp) {
      toast.error("Please enter both email and OTP");
      return;
    }

    try {
      setIsLoading(true);
      await authService.verifyOTP({ email, otp });
      toast.success("OTP verified successfully");
      router.push("/reset-password");
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-gray-600 mt-2">Enter the OTP sent to your email</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">OTP</label>
            <Input
              placeholder="000000"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              disabled={isLoading}
              maxLength={6}
              className="text-2xl tracking-widest text-center"
            />
          </div>

          <Button
          variant={"primary"}
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="w-full h-12"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </div>

        <Button
        variant={"pink"}
          onClick={() => router.back()}
          className="w-full h-12"
        >
          <ArrowLeft size={16} />
          Go back
        </Button>
      </div>
    </motion.div>
  );
}
