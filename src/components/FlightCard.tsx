import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, type FlightStatus } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Plane } from "lucide-react";
import { Link } from "react-router-dom";

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  status: FlightStatus;
  gate?: string;
  terminal?: string;
}

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-foreground">
              {flight.flightNumber}
            </h3>
            <p className="text-muted-foreground">{flight.airline}</p>
          </div>
          <StatusBadge status={flight.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-aviation-sky/20 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{flight.origin}</p>
              <p className="text-sm text-muted-foreground">
                {flight.departure}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="h-px bg-border flex-1 w-8"></div>
              <Plane className="h-4 w-4 text-primary rotate-90" />
              <div className="h-px bg-border flex-1 w-8"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-aviation-sky/20 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{flight.destination}</p>
              <p className="text-sm text-muted-foreground">{flight.arrival}</p>
            </div>
          </div>
        </div>

        {(flight.gate || flight.terminal) && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
            {flight.terminal && (
              <div className="flex items-center space-x-1">
                <span>Terminal:</span>
                <span className="font-medium">{flight.terminal}</span>
              </div>
            )}
            {flight.gate && (
              <div className="flex items-center space-x-1">
                <span>Gate:</span>
                <span className="font-medium">{flight.gate}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: 2 min ago</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/flight/${flight.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
