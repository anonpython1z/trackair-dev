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
import { type CourierShipment } from "./CourierCard";
import { type FlightStatus } from "./StatusBadge";
import { Plus, Save, X, Package } from "lucide-react";

interface AdminCourierFormProps {
  shipment?: CourierShipment;
  onSave: (shipment: Omit<CourierShipment, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export const AdminCourierForm = ({
  shipment,
  onSave,
  onCancel,
}: AdminCourierFormProps) => {
  const [formData, setFormData] = useState({
    trackingNumber: shipment?.trackingNumber || "",
    service: shipment?.service || ("Express" as const),
    origin: shipment?.origin || "",
    destination: shipment?.destination || "",
    departure: shipment?.departure || "",
    estimatedDelivery: shipment?.estimatedDelivery || "",
    status: shipment?.status || ("on-time" as FlightStatus),
    weight: shipment?.weight || "",
    dimensions: shipment?.dimensions || "",
    carrier: shipment?.carrier || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: shipment?.id,
      ...formData,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {shipment ? (
            <>
              <Save className="h-5 w-5" />
              <span>Edit Shipment {shipment.trackingNumber}</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span>Add New Shipment</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => handleChange("trackingNumber", e.target.value)}
                placeholder="e.g., TA-PKG-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service Type</Label>
              <Select
                value={formData.service}
                onValueChange={(value: typeof formData.service) =>
                  handleChange("service", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Express">Express</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Next Day">Next Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                placeholder="e.g., New York, NY"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                placeholder="e.g., Los Angeles, CA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure">Pickup Date/Time</Label>
              <Input
                id="departure"
                value={formData.departure}
                onChange={(e) => handleChange("departure", e.target.value)}
                placeholder="e.g., Dec 15, 9:00 AM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
              <Input
                id="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={(e) =>
                  handleChange("estimatedDelivery", e.target.value)
                }
                placeholder="e.g., Dec 17, 5:00 PM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: FlightStatus) =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="boarding">In Transit</SelectItem>
                  <SelectItem value="departed">Out for Delivery</SelectItem>
                  <SelectItem value="arrived">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier (Optional)</Label>
              <Input
                id="carrier"
                value={formData.carrier}
                onChange={(e) => handleChange("carrier", e.target.value)}
                placeholder="e.g., Flight TA003"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="e.g., 2.5 kg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                placeholder="e.g., 30x20x15 cm"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Package className="h-4 w-4 mr-2" />
              Save Shipment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
