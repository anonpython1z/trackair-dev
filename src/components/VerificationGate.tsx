import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Captcha } from "@/components/Captcha";
import { Shield, Plane, Globe, CheckCircle } from "lucide-react";

interface VerificationGateProps {
  onVerified: () => void;
}

export const VerificationGate = ({ onVerified }: VerificationGateProps) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate initial checking process (like Cloudflare)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsChecking(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleProceed = () => {
    if (isCaptchaVerified) {
      // Store verification in session
      sessionStorage.setItem("trackair-verified", "true");
      console.log("User verified, proceeding to site");
      onVerified();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-2xl">
                <Plane className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              TrackAir Internationals
            </h1>
            <p className="text-muted-foreground mt-2">
              Verifying your connection security
            </p>
          </div>
        </div>

        {/* Main Verification Card */}
        <Card className="border-2 border-dashed border-primary/20 shadow-xl">
          <CardContent className="p-8 space-y-6">
            {isChecking ? (
              // Checking Phase (like Cloudflare)
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary animate-pulse" />
                  <span className="text-lg font-medium">
                    Checking your browser...
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {progress}% Complete
                  </div>
                </div>

                {/* Status Messages */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-status-ontime" />
                    <span>Browser compatibility check</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-status-ontime" />
                    <span>Security protocols verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {progress >= 90 ? (
                      <CheckCircle className="h-4 w-4 text-status-ontime" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span>Connection established</span>
                  </div>
                </div>
              </div>
            ) : (
              // Verification Phase
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-lg font-medium">
                      Security Verification Required
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please complete the verification below to continue to
                    TrackAir Internationals
                  </p>
                </div>

                {/* Captcha */}
                <Captcha onVerify={setIsCaptchaVerified} />

                {/* Security Info */}
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Why am I seeing this?</span>
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Protecting against automated traffic</li>
                    <li>• Ensuring secure access to our services</li>
                    <li>• Maintaining optimal performance for all users</li>
                  </ul>
                </div>

                {/* Continue Button */}
                <Button
                  onClick={handleProceed}
                  disabled={!isCaptchaVerified}
                  className="w-full"
                  size="lg"
                >
                  {isCaptchaVerified
                    ? "Continue to TrackAir Internationals"
                    : "Complete verification above"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>This security check is powered by TrackAir Security Systems</p>
          <p className="mt-1">Your connection is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
};
