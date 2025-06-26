import { createContext, useContext, useState, ReactNode } from "react";

interface CaptchaContextType {
  isEnabled: boolean;
  toggleCaptcha: () => void;
  requireCaptchaFor: string[];
  updateCaptchaRequirements: (pages: string[]) => void;
  isSiteGateEnabled: boolean;
  toggleSiteGate: () => void;
}

const CaptchaContext = createContext<CaptchaContextType | undefined>(undefined);

export const CaptchaProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(true); // Default enabled
  const [isSiteGateEnabled, setIsSiteGateEnabled] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("trackair-site-gate-enabled");
    return saved ? JSON.parse(saved) : false;
  });
  const [requireCaptchaFor, setRequireCaptchaFor] = useState([
    "contact",
    "booking",
    "admin-login",
  ]);

  const toggleCaptcha = () => {
    setIsEnabled((prev) => !prev);
  };

  const toggleSiteGate = () => {
    setIsSiteGateEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "trackair-site-gate-enabled",
        JSON.stringify(newValue),
      );
      // Clear verification when toggling
      if (newValue) {
        sessionStorage.removeItem("trackair-verified");
      }
      console.log("Site gate toggled to:", newValue);
      return newValue;
    });
  };

  const updateCaptchaRequirements = (pages: string[]) => {
    setRequireCaptchaFor(pages);
  };

  return (
    <CaptchaContext.Provider
      value={{
        isEnabled,
        toggleCaptcha,
        requireCaptchaFor,
        updateCaptchaRequirements,
        isSiteGateEnabled,
        toggleSiteGate,
      }}
    >
      {children}
    </CaptchaContext.Provider>
  );
};

export const useCaptcha = () => {
  const context = useContext(CaptchaContext);
  if (context === undefined) {
    throw new Error("useCaptcha must be used within a CaptchaProvider");
  }
  return context;
};
