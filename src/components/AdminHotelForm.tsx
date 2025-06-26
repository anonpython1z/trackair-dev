import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type HotelBooking, type HotelStatus } from "./HotelCard";
import { Plus, Save, X, Hotel } from "lucide-react";

interface AdminHotelFormProps {
  hotel?: HotelBooking;
  onSave: (hotel: Omit<HotelBooking, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export const AdminHotelForm = ({
  hotel,
  onSave,
  onCancel,
}: AdminHotelFormProps) => {
  const [formData, setFormData] = useState({
    confirmationNumber: hotel?.confirmationNumber || "",
    hotelName: hotel?.hotelName || "",
    brand: hotel?.brand || "StayEase Premium",
    location: hotel?.location || "",
    checkIn: hotel?.checkIn || "",
    checkOut: hotel?.checkOut || "",
    guests: hotel?.guests || 1,
    roomType: hotel?.roomType || "",
    status: hotel?.status || ("available" as HotelStatus),
    rating: hotel?.rating || 4,
    pricePerNight: hotel?.pricePerNight || 0,
    totalPrice: hotel?.totalPrice || 0,
    amenities: hotel?.amenities || [],
    roomNumber: hotel?.roomNumber || "",
    image: hotel?.image || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: hotel?.id,
      ...formData,
    });
  };

  const handleChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmenitiesChange = (amenityString: string) => {
    const amenities = amenityString
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
    handleChange("amenities", amenities);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {hotel ? (
            <>
              <Save className="h-5 w-5" />
              <span>Edit Hotel {hotel.confirmationNumber}</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span>Add New Hotel Booking</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="confirmationNumber">Confirmation Number</Label>
              <Input
                id="confirmationNumber"
                value={formData.confirmationNumber}
                onChange={(e) =>
                  handleChange("confirmationNumber", e.target.value)
                }
                placeholder="e.g., SE-HTL-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name</Label>
              <Input
                id="hotelName"
                value={formData.hotelName}
                onChange={(e) => handleChange("hotelName", e.target.value)}
                placeholder="e.g., Grand Central Plaza"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) => handleChange("brand", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="StayEase Premium">
                    StayEase Premium
                  </SelectItem>
                  <SelectItem value="StayEase Resort">
                    StayEase Resort
                  </SelectItem>
                  <SelectItem value="StayEase Business">
                    StayEase Business
                  </SelectItem>
                  <SelectItem value="StayEase Nature">
                    StayEase Nature
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g., New York, NY"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Date/Time</Label>
              <Input
                id="checkIn"
                value={formData.checkIn}
                onChange={(e) => handleChange("checkIn", e.target.value)}
                placeholder="e.g., Dec 20, 3:00 PM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Date/Time</Label>
              <Input
                id="checkOut"
                value={formData.checkOut}
                onChange={(e) => handleChange("checkOut", e.target.value)}
                placeholder="e.g., Dec 23, 11:00 AM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={(e) =>
                  handleChange("guests", parseInt(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Input
                id="roomType"
                value={formData.roomType}
                onChange={(e) => handleChange("roomType", e.target.value)}
                placeholder="e.g., Executive Suite"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: HotelStatus) =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="booking">Booking Confirmed</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Hotel Rating (1-5 stars)</Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) =>
                  handleChange("rating", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerNight">Price Per Night ($)</Label>
              <Input
                id="pricePerNight"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerNight}
                onChange={(e) =>
                  handleChange("pricePerNight", parseFloat(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalPrice">Total Price ($)</Label>
              <Input
                id="totalPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.totalPrice}
                onChange={(e) =>
                  handleChange("totalPrice", parseFloat(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number (Optional)</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleChange("roomNumber", e.target.value)}
                placeholder="e.g., 2501"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="e.g., https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                value={formData.amenities.join(", ")}
                onChange={(e) => handleAmenitiesChange(e.target.value)}
                placeholder="e.g., WiFi, Breakfast, Gym, Spa, Parking"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Hotel className="h-4 w-4 mr-2" />
              Save Hotel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
