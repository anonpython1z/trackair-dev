import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FlightSearch, type SearchFilters } from "@/components/FlightSearch";
import { FlightCard, type Flight } from "@/components/FlightCard";
import { Plane, TrendingUp, Users, Clock, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock flight data - International and Domestic
const mockFlights: Flight[] = [
  {
    id: "1",
    flightNumber: "TA001",
    airline: "TrackAir Internationals",
    origin: "JFK",
    destination: "LHR",
    departure: "11:30 PM",
    arrival: "12:15 PM+1",
    status: "on-time",
    gate: "A12",
    terminal: "Terminal 1",
  },
  {
    id: "2",
    flightNumber: "TA002",
    airline: "TrackAir Internationals",
    origin: "LAX",
    destination: "NRT",
    departure: "2:45 PM",
    arrival: "6:20 PM+1",
    status: "delayed",
    gate: "B8",
    terminal: "Terminal 2",
  },
  {
    id: "3",
    flightNumber: "TA003",
    airline: "TrackAir Internationals",
    origin: "DXB",
    destination: "SYD",
    departure: "8:15 AM",
    arrival: "11:45 PM",
    status: "boarding",
    gate: "C5",
    terminal: "Terminal 3",
  },
  {
    id: "4",
    flightNumber: "TA004",
    airline: "TrackAir Internationals",
    origin: "FRA",
    destination: "GRU",
    departure: "9:30 PM",
    arrival: "6:15 AM+1",
    status: "arrived",
    gate: "D2",
    terminal: "Terminal 1",
  },
  {
    id: "5",
    flightNumber: "TA005",
    airline: "TrackAir Internationals",
    origin: "SIN",
    destination: "CDG",
    departure: "1:20 AM",
    arrival: "8:50 AM",
    status: "cancelled",
    gate: "E7",
    terminal: "Terminal 2",
  },
  {
    id: "6",
    flightNumber: "TA006",
    airline: "TrackAir Internationals",
    origin: "YYZ",
    destination: "ICN",
    departure: "3:05 PM",
    arrival: "7:35 PM+1",
    status: "departed",
    gate: "F3",
    terminal: "Terminal 1",
  },
  {
    id: "7",
    flightNumber: "TA007",
    airline: "TrackAir Internationals",
    origin: "BOM",
    destination: "JFK",
    departure: "2:15 AM",
    arrival: "7:45 AM",
    status: "on-time",
    gate: "G4",
    terminal: "Terminal 4",
  },
  {
    id: "8",
    flightNumber: "TA008",
    airline: "TrackAir Internationals",
    origin: "MEX",
    destination: "MAD",
    departure: "6:30 PM",
    arrival: "3:20 PM+1",
    status: "boarding",
    gate: "H1",
    terminal: "Terminal 2",
  },
];

const Index = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    flightNumber: "",
    origin: "",
    destination: "",
    status: "all",
  });

  const filteredFlights = useMemo(() => {
    return mockFlights.filter((flight) => {
      if (
        searchFilters.flightNumber &&
        !flight.flightNumber
          .toLowerCase()
          .includes(searchFilters.flightNumber.toLowerCase())
      ) {
        return false;
      }
      if (
        searchFilters.origin &&
        !flight.origin
          .toLowerCase()
          .includes(searchFilters.origin.toLowerCase())
      ) {
        return false;
      }
      if (
        searchFilters.destination &&
        !flight.destination
          .toLowerCase()
          .includes(searchFilters.destination.toLowerCase())
      ) {
        return false;
      }
      if (
        searchFilters.status &&
        searchFilters.status !== "all" &&
        flight.status !== searchFilters.status
      ) {
        return false;
      }
      return true;
    });
  }, [searchFilters]);

  const stats = useMemo(() => {
    const total = mockFlights.length;
    const onTime = mockFlights.filter((f) => f.status === "on-time").length;
    const delayed = mockFlights.filter((f) => f.status === "delayed").length;
    const active = mockFlights.filter(
      (f) => f.status === "boarding" || f.status === "on-time",
    ).length;

    return { total, onTime, delayed, active };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Hero Section - Enhanced */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background rounded-2xl border border-border/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative text-center space-y-8 py-16 px-8">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-2xl">
                  <Plane className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                TrackAir Internationals
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of travel tracking with our comprehensive
              <span className="text-primary font-semibold">
                {" "}
                real-time monitoring
              </span>{" "}
              system. Track flights, packages, and more across the globe with
              precision and style.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-status-ontime/10 border border-status-ontime/20 rounded-full">
                <div className="w-2 h-2 bg-status-ontime rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-status-ontime">
                  Real-time Updates
                </span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Global Coverage
                </span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Secure Tracking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-primary">
                Total Flights
              </CardTitle>
              <div className="p-2 bg-primary/20 rounded-lg">
                <Plane className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground">
                {stats.total}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-status-ontime rounded-full mr-1 animate-pulse"></div>
                Active today
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-status-ontime/10 to-status-ontime/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-status-ontime/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-status-ontime">
                On Time
              </CardTitle>
              <div className="p-2 bg-status-ontime/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-status-ontime" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-status-ontime">
                {stats.onTime}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-status-ontime rounded-full mr-1 animate-pulse"></div>
                {Math.round((stats.onTime / stats.total) * 100)}% of flights
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-status-delayed/10 to-status-delayed/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-status-delayed/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-status-delayed">
                Delayed
              </CardTitle>
              <div className="p-2 bg-status-delayed/20 rounded-lg">
                <Clock className="h-4 w-4 text-status-delayed" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-status-delayed">
                {stats.delayed}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-status-delayed rounded-full mr-1 animate-pulse"></div>
                {Math.round((stats.delayed / stats.total) * 100)}% of flights
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-accent">
                Active Now
              </CardTitle>
              <div className="p-2 bg-accent/20 rounded-lg">
                <Users className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-accent">
                {stats.active}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-accent rounded-full mr-1 animate-pulse"></div>
                Boarding or in-flight
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <FlightSearch onSearch={setSearchFilters} />

        {/* Flight List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Flight Schedule ({filteredFlights.length})
            </h2>
          </div>

          {filteredFlights.length === 0 ? (
            <div className="text-center py-12">
              <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No flights found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search filters to find flights.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
