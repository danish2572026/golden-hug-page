import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { OTPVerification } from "@/components/OTPVerification";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const ForgotPassword = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<"email" | "otp" | "reset" | "notfound" | "success">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 - request OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flow: "forgot-password" }),
      });
      const data = await res.json();

      if (!res.ok || !data.is_success) {
        if (res.status === 404) {
          setStep("notfound");
        } else {
          toast.error(data.message || "Failed to request password reset");
        }
        return;
      }

      toast.success("OTP sent to your email!");
      setStep("otp");
    } catch {
      toast.error("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - reset password (after OTP verified)
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.is_success) {
        toast.error(data.message || "Failed to reset password");
        return;
      }

      toast.success("Password set successfully!");
      setStep("success");
    } catch {
      toast.error("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {step === "email" && (
        <>
          <div>
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <Button onClick={handleSendOtp} disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send OTP"}
          </Button>
          <Button variant="ghost" onClick={onBack} className="w-full">
            ← Back
          </Button>
        </>
      )}

      {step === "otp" && (
        <OTPVerification
          email={email}
          context="forgot-password"
          onBack={() => setStep("email")}
          onVerified={() => setStep("reset")}
        />
      )}

      {step === "reset" && (
        <>
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <Button onClick={handleResetPassword} disabled={loading} className="w-full">
            {loading ? "Resetting..." : "Set New Password"}
          </Button>
        </>
      )}

      {step === "notfound" && (
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold">Email not found</p>
          <Button onClick={() => setStep("email")} className="w-full">
            Try Again
          </Button>
        </div>
      )}

      {step === "success" && (
        <div className="text-center space-y-4">
          <p className="text-green-600 font-semibold">✅ Password set successfully!</p>
          <Button onClick={onBack} className="w-full">
            Go to Sign In
          </Button>
        </div>
      )}
    </div>
  );
};
