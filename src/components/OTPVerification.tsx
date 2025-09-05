import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface OTPVerificationProps {
  email: string;
  onBack: () => void;
  onVerified: (otpCode: string) => void; // pass OTP back to parent
  context: "signup" | "forgot-password";
}

export function OTPVerification({ email, context, onBack, onVerified }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode, flow: context })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      toast.success("OTP verified successfully!");
      onVerified(otpCode); // pass otp to parent ForgotPassword
    } catch (error) {
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flow: context })
      });

      const data = await res.json();

      if (!data.is_success) {
        toast.error(data.message || "Failed to resend code");
        return;
      }

      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error("Network error, please try again");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle>Verify Your Email</CardTitle>
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to<br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* OTP Input */}
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-bold"
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </Button>

        {/* Resend Code */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn’t receive the code?
          </p>
          <Button
            variant="ghost"
            onClick={handleResendCode}
            disabled={resendLoading}
            className="text-sm"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </Button>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </CardContent>
    </Card>
  );
}

