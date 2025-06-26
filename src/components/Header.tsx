import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Search, Package, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
            <Plane className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">
            TrackAir Internationals
          </span>
        </Link>

        <nav className="flex items-center space-x-1">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            asChild
            className={cn(
              "transition-all duration-200",
              isActive("/") && "bg-primary text-primary-foreground",
            )}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Flights</span>
            </Link>
          </Button>

          <Button
            variant={isActive("/courier") ? "default" : "ghost"}
            asChild
            className={cn(
              "transition-all duration-200",
              isActive("/courier") && "bg-primary text-primary-foreground",
            )}
          >
            <Link to="/courier" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Courier</span>
            </Link>
          </Button>

          <Button
            variant={isActive("/hotels") ? "default" : "ghost"}
            asChild
            className={cn(
              "transition-all duration-200",
              isActive("/hotels") && "bg-primary text-primary-foreground",
            )}
          >
            <Link to="/hotels" className="flex items-center space-x-2">
              <Hotel className="h-4 w-4" />
              <span className="hidden sm:inline">Hotels</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
