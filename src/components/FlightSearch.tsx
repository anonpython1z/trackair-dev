import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FlightSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  flightNumber: string;
  origin: string;
  destination: string;
  status: string;
}

export const FlightSearch = ({ onSearch }: FlightSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    flightNumber: "",
    origin: "",
    destination: "",
    status: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      flightNumber: "",
      origin: "",
      destination: "",
      status: "all",
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Search Flights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Flight Number</label>
            <Input
              placeholder="e.g., TA123"
              value={filters.flightNumber}
              onChange={(e) =>
                setFilters({ ...filters, flightNumber: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Origin</label>
            <Input
              placeholder="e.g., NYC"
              value={filters.origin}
              onChange={(e) =>
                setFilters({ ...filters, origin: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <Input
              placeholder="e.g., LAX"
              value={filters.destination}
              onChange={(e) =>
                setFilters({ ...filters, destination: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="on-time">On Time</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="boarding">Boarding</SelectItem>
                <SelectItem value="departed">Departed</SelectItem>
                <SelectItem value="arrived">Arrived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <div className="flex space-x-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
