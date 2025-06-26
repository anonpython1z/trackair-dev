import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plane,
  MapPin,
  Clock,
  Users,
  Wifi,
  Utensils,
} from "lucide-react";

// This would normally come from your data store
const mockFlightDetails = {
  id: "1",
  flightNumber: "LF001",
  airline: "Local Airways",
  aircraft: "Boeing 737-800",
  origin: "JFK",
  originFull: "John F. Kennedy International Airport",
  destination: "LAX",
  destinationFull: "Los Angeles International Airport",
  departure: "10:30 AM",
  arrival: "2:15 PM",
  status: "on-time" as const,
  gate: "A12",
  terminal: "Terminal 1",
  duration: "5h 45m",
  distance: "2,475 miles",
  altitude: "35,000 ft",
  speed: "520 mph",
  amenities: ["WiFi", "Meals", "Entertainment"],
  updates: [
    {
      time: "9:45 AM",
      message: "Flight is on schedule for departure",
      type: "info",
    },
    {
      time: "9:30 AM",
      message: "Boarding will begin at gate A12",
      type: "info",
    },
    {
      time: "9:15 AM",
      message: "Aircraft has arrived at the gate",
      type: "success",
    },
  ],
};

const FlightDetails = () => {
  const { id } = useParams();
  const flight = mockFlightDetails; // In a real app, fetch by ID

  if (!flight) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Flight Not Found</h1>
            <Button asChild>
              <Link to="/">Back to Flight Tracker</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Flight Tracker</span>
          </Link>
        </Button>

        {/* Flight Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold">{flight.flightNumber}</h1>
              <StatusBadge status={flight.status} />
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>{flight.airline}</span>
              <span>•</span>
              <span>{flight.aircraft}</span>
            </div>
          </div>
        </div>

        {/* Flight Route */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <span>Flight Route</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Departure</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">{flight.origin}</div>
                  <div className="text-sm text-muted-foreground">
                    {flight.originFull}
                  </div>
                  <div className="text-lg font-medium mt-1">
                    {flight.departure}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-px bg-border w-8"></div>
                    <Plane className="h-6 w-6 text-primary rotate-90" />
                    <div className="h-px bg-border w-8"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {flight.duration}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Arrival</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">{flight.destination}</div>
                  <div className="text-sm text-muted-foreground">
                    {flight.destinationFull}
                  </div>
                  <div className="text-lg font-medium mt-1">
                    {flight.arrival}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flight Information */}
          <Card>
            <CardHeader>
              <CardTitle>Flight Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Terminal</div>
                  <div className="font-medium">{flight.terminal}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Gate</div>
                  <div className="font-medium">{flight.gate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                  <div className="font-medium">{flight.distance}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{flight.duration}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Amenities</div>
                <div className="flex flex-wrap gap-2">
                  {flight.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                      {amenity === "Meals" && (
                        <Utensils className="h-3 w-3 mr-1" />
                      )}
                      {amenity === "Entertainment" && (
                        <Users className="h-3 w-3 mr-1" />
                      )}
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flight Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Live Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flight.updates.map((update, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          update.type === "success"
                            ? "bg-status-ontime"
                            : "bg-primary"
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-medium">
                        {update.message}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {update.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Data */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Flight Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {flight.altitude}
                </div>
                <div className="text-sm text-muted-foreground">Altitude</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {flight.speed}
                </div>
                <div className="text-sm text-muted-foreground">Speed</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-status-ontime">
                  On Track
                </div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FlightDetails;
