import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Hotel,
  Star,
  Users,
  Wifi,
  Car,
  Coffee,
} from "lucide-react";
import { Link } from "react-router-dom";

export type HotelStatus =
  | "available"
  | "booking"
  | "checked-in"
  | "checked-out"
  | "cancelled";

export interface HotelBooking {
  id: string;
  confirmationNumber: string;
  hotelName: string;
  brand: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  status: HotelStatus;
  rating: number;
  pricePerNight: number;
  totalPrice: number;
  amenities: string[];
  roomNumber?: string;
  image?: string;
}

interface HotelCardProps {
  booking: HotelBooking;
}

const statusConfig: Record<HotelStatus, { label: string; className: string }> =
  {
    available: {
      label: "Available",
      className: "bg-status-ontime text-white",
    },
    booking: {
      label: "Booking Confirmed",
      className: "bg-status-boarding text-white",
    },
    "checked-in": {
      label: "Checked In",
      className: "bg-status-ontime text-white",
    },
    "checked-out": {
      label: "Checked Out",
      className: "bg-muted text-muted-foreground",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-status-cancelled text-white",
    },
  };

export const HotelCard = ({ booking }: HotelCardProps) => {
  const config = statusConfig[booking.status];

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden group">
      <div className="relative">
        {booking.image && (
          <div className="h-48 overflow-hidden">
            <img
              src={booking.image}
              alt={booking.hotelName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className={config.className}>{config.label}</Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-foreground flex items-center space-x-2">
              <Hotel className="h-5 w-5 text-primary" />
              <span>{booking.hotelName}</span>
            </h3>
            <p className="text-muted-foreground">{booking.brand}</p>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < booking.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {booking.rating}/5
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${booking.pricePerNight}
            </div>
            <div className="text-sm text-muted-foreground">per night</div>
            {booking.confirmationNumber && (
              <div className="text-xs text-muted-foreground mt-1">
                #{booking.confirmationNumber}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{booking.location}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border">
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">Check-in</div>
            <div className="font-medium">{booking.checkIn}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">Check-out</div>
            <div className="font-medium">{booking.checkOut}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
              <Users className="h-3 w-3" />
              <span>Guests</span>
            </div>
            <div className="font-medium">{booking.guests}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Room Type:</span>
            <span className="font-medium">{booking.roomType}</span>
          </div>

          {booking.roomNumber && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Room Number:
              </span>
              <span className="font-medium">{booking.roomNumber}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Price:</span>
            <span className="font-bold text-lg text-primary">
              ${booking.totalPrice}
            </span>
          </div>
        </div>

        {booking.amenities.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Amenities:
            </div>
            <div className="flex flex-wrap gap-2">
              {booking.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                  {amenity === "Parking" && <Car className="h-3 w-3 mr-1" />}
                  {amenity === "Breakfast" && (
                    <Coffee className="h-3 w-3 mr-1" />
                  )}
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Updated: 3 min ago</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/hotel/${booking.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
