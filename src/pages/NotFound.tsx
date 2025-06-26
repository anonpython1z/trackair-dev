import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-muted rounded-full">
              <AlertTriangle className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Flight Not Found
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              The flight route you're looking for has been cancelled or doesn't
              exist in our system.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Flight Tracker</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin">Admin Dashboard</Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Error code: 404 • Path: {location.pathname}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
