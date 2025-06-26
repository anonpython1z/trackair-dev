import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Shield } from "lucide-react";

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  className?: string;
}

// Simple math captcha generator
const generateCaptcha = () => {
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let num1, num2, answer;

  switch (operation) {
    case "+":
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 50) + 25;
      num2 = Math.floor(Math.random() * 25) + 1;
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = 5;
      num2 = 3;
      answer = 8;
  }

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer,
  };
};

export const Captcha = ({ onVerify, className }: CaptchaProps) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userAnswer, setUserAnswer] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserAnswer("");
    setIsVerified(false);
    setAttempts(0);
  };

  const verifyCaptcha = () => {
    const isCorrect = parseInt(userAnswer) === captcha.answer;
    setIsVerified(isCorrect);
    setAttempts((prev) => prev + 1);
    onVerify(isCorrect);

    if (!isCorrect && attempts >= 2) {
      // Auto-refresh after 3 failed attempts
      setTimeout(refreshCaptcha, 1500);
    }
  };

  useEffect(() => {
    if (userAnswer && userAnswer.length > 0) {
      const timer = setTimeout(() => {
        if (parseInt(userAnswer) === captcha.answer) {
          setIsVerified(true);
          onVerify(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userAnswer, captcha.answer, onVerify]);

  return (
    <Card className={`border-2 border-dashed border-primary/20 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Security Verification</span>
          {isVerified && (
            <div className="w-2 h-2 bg-status-ontime rounded-full animate-pulse"></div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-4 p-4 bg-muted rounded-lg">
            <span className="text-lg font-mono font-bold text-foreground">
              {captcha.question}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshCaptcha}
              className="h-8 w-8 p-0"
              title="Refresh captcha"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter answer"
              className={`${
                isVerified
                  ? "border-status-ontime bg-status-ontime/5"
                  : attempts > 0 && !isVerified
                    ? "border-status-cancelled bg-status-cancelled/5"
                    : ""
              }`}
              disabled={isVerified}
            />
            <Button
              onClick={verifyCaptcha}
              disabled={!userAnswer || isVerified}
              variant={isVerified ? "default" : "outline"}
              className={
                isVerified ? "bg-status-ontime hover:bg-status-ontime/90" : ""
              }
            >
              {isVerified ? "Verified" : "Verify"}
            </Button>
          </div>

          {attempts > 0 && !isVerified && (
            <p className="text-xs text-status-cancelled">
              Incorrect answer. {3 - attempts} attempts remaining.
            </p>
          )}

          {isVerified && (
            <p className="text-xs text-status-ontime flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Security verification completed</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
