import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Captcha } from "@/components/Captcha";
import { useCaptcha } from "@/contexts/CaptchaContext";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const { isEnabled: isCaptchaEnabled } = useCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isCaptchaEnabled && !isCaptchaVerified) {
      toast({
        title: "Security Verification Required",
        description: "Please complete the captcha verification first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = onLogin(username, password);

    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            TrackAir Admin Login
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your credentials to access the admin dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {isCaptchaEnabled && (
              <Captcha onVerify={setIsCaptchaVerified} className="w-full" />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (isCaptchaEnabled && !isCaptchaVerified)}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Default Admin Credentials:</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Username:</strong> admin
              <br />
              <strong>Password:</strong> trackair2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
