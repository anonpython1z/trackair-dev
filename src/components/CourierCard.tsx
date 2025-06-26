import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, type FlightStatus } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Package, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export interface CourierShipment {
  id: string;
  trackingNumber: string;
  service: "Express" | "Standard" | "Economy" | "Next Day";
  origin: string;
  destination: string;
  departure: string;
  estimatedDelivery: string;
  status: FlightStatus;
  weight: string;
  dimensions: string;
  carrier?: string;
}

interface CourierCardProps {
  shipment: CourierShipment;
}

export const CourierCard = ({ shipment }: CourierCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-foreground flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <span>{shipment.trackingNumber}</span>
            </h3>
            <p className="text-muted-foreground">{shipment.service} Service</p>
          </div>
          <StatusBadge status={shipment.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-aviation-sky/20 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{shipment.origin}</p>
              <p className="text-sm text-muted-foreground">
                Picked up: {shipment.departure}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="h-px bg-border flex-1 w-8"></div>
              <Truck className="h-4 w-4 text-primary" />
              <div className="h-px bg-border flex-1 w-8"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-aviation-sky/20 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{shipment.destination}</p>
              <p className="text-sm text-muted-foreground">
                ETA: {shipment.estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span>Weight:</span>
            <span className="font-medium">{shipment.weight}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Dimensions:</span>
            <span className="font-medium">{shipment.dimensions}</span>
          </div>
          {shipment.carrier && (
            <div className="flex items-center space-x-1">
              <span>Carrier:</span>
              <span className="font-medium">{shipment.carrier}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: 1 min ago</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/courier/${shipment.id}`}>Track Package</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
