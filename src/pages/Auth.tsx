import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Eye, EyeOff, Heart } from "lucide-react";
import { OTPVerification } from "@/components/OTPVerification";
import { ForgotPassword } from "@/components/ForgotPassword";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
type OTPMode = "signup" | "forgot-password";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpMode, setOtpMode] = useState<OTPMode>("signup");
  const navigate = useNavigate();

  // Debug watcher
  useEffect(() => {
    console.log("showOTP changed:", showOTP, "mode:", otpMode, "email:", signupEmail);
  }, [showOTP, otpMode, signupEmail]);

  const signUp = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      const data = await res.json();
      console.log("inside_signup", data);

      if (!data.is_success) {
        return { success: false, message: data.message };
      }
      return { success: true, message: data.message };
    } catch {
      return { success: false, message: "Network error" };
    }
  };


  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.is_success) {
        return { error: { message: data.message || "Login failed" } };
      }
      // Save token, uid, and email in localStorage
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("userEmail", email);
      if (data.data.uid) {
        localStorage.setItem("uid", data.data.uid);
      }
      return { error: null };
    } catch (err) {
      return { error: { message: "Network error" } };
    }
  };

  const triggerOTPForInactiveUser = async (email: string, mode: OTPMode) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flow: mode }),
      });
      const data = await res.json();

      if (!data.message) {
        toast.error(data.message || "Failed to send OTP");
        return false;
      }

      toast.info("Please verify your email to continue");
      return true;
    } catch {
      toast.error("Network error while sending OTP");
      return false;
    }
  };

  const handleAuth = async (type: "signin" | "signup") => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (type === "signup") {
      if (!firstName || !lastName) {
        toast.error("Please fill in first and last name");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      if (type === "signup") {
        const { success, message } = await signUp(firstName, lastName, email, password);
        console.log("inside_handleAuth", message);

        if (!success) {
          if (message.toLowerCase().includes("exists")) {
            toast.error("Account already exists. Try signing in.");
          } else {
            toast.error(message);
          }
          return;
        }
        console.log("reaching checkpoint 1");
        setSignupEmail(email);
        setOtpMode("signup");
        console.log("reaching checkpoint 2", showOTP);
        setShowOTP(true);
        console.log("reaching checkpoint 3", showOTP);
        toast.success("Account created! Verify your email.");
      } else {
        const { error } = await signIn(email, password);

        if (error) {
          if (error.message.toLowerCase().includes("inactive")) {
            const triggered = await triggerOTPForInactiveUser(email, "signup");
            if (triggered) {
              setSignupEmail(email);
              setOtpMode("signup");
              setShowOTP(true);
            }
            return;
          }

          if (error.message.toLowerCase().includes("invalid")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("Signed in successfully!");
        navigate("/");
      }
    } catch {
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const notMatch = () => password !== confirmPassword;

  const handleOTPVerified = () => {
    setShowOTP(false);
    toast.success("Email verified successfully! You can now sign in.");
    setEmail("");
    setPassword("");
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
    setSignupEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Health Monitor</h1>
          </div>
          <p className="text-muted-foreground">
            Access your health dashboard and emergency monitoring
          </p>
        </div>

        {showOTP ? (
          <OTPVerification
            email={signupEmail}
            context={otpMode}
            onBack={handleBackFromOTP}
            onVerified={handleOTPVerified}
          />
        ) : showForgotPassword ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
              <ForgotPassword
                onBack={() => setShowForgotPassword(false)}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Welcome</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* --- SIGN IN --- */}
                <TabsContent value="signin" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={() => handleAuth("signin")} disabled={loading} className="w-full">
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <div className="relative my-4">
                      <Separator />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                        OR
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">
                        Sign in with Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Sign in with Facebook
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* --- SIGN UP --- */}
                <TabsContent value="signup" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                    <Button
                      onClick={() => {
                        if (notMatch()) {
                          toast.info("Password does not match");
                          return;
                        }
                        handleAuth("signup");
                      }}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    <div className="relative my-4">
                      <Separator />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                        OR
                      </span>
                    </div>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">
                        Create Account with Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Create Account with Facebook
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground">
            ← Back to homepage
          </Button>
        </div>
      </div>
    </div>
  );
};
