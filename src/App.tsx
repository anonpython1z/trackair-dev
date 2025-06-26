import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { CaptchaProvider, useCaptcha } from "@/contexts/CaptchaContext";
import { VerificationGate } from "@/components/VerificationGate";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Courier from "./pages/Courier";
import Hotels from "./pages/Hotels";
import FlightDetails from "./pages/FlightDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isSiteGateEnabled } = useCaptcha();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already verified
  useEffect(() => {
    const verified = sessionStorage.getItem("trackair-verified");
    console.log("Gate enabled:", isSiteGateEnabled, "Verified:", verified);

    if (!isSiteGateEnabled || verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
    setIsLoading(false);
  }, [isSiteGateEnabled]);

  // Don't render anything while loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show verification gate if enabled and not verified
  if (isSiteGateEnabled && !isVerified) {
    console.log("Showing verification gate");
    return <VerificationGate onVerified={() => setIsVerified(true)} />;
  }

  // Show main app if verified or gate disabled
  console.log("Showing main app");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/courier" element={<Courier />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flight/:id" element={<FlightDetails />} />
        <Route path="/courier/:id" element={<FlightDetails />} />
        <Route path="/hotel/:id" element={<FlightDetails />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CaptchaProvider>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AdminProvider>
    </CaptchaProvider>
  </QueryClientProvider>
);

export default App;
