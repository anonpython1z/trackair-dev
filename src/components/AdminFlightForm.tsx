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
import { type Flight, type FlightStatus } from "./FlightCard";
import { Plus, Save, X } from "lucide-react";

interface AdminFlightFormProps {
  flight?: Flight;
  onSave: (flight: Omit<Flight, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export const AdminFlightForm = ({
  flight,
  onSave,
  onCancel,
}: AdminFlightFormProps) => {
  const [formData, setFormData] = useState({
    flightNumber: flight?.flightNumber || "",
    airline: flight?.airline || "TrackAir Internationals",
    origin: flight?.origin || "",
    destination: flight?.destination || "",
    departure: flight?.departure || "",
    arrival: flight?.arrival || "",
    status: flight?.status || ("on-time" as FlightStatus),
    gate: flight?.gate || "",
    terminal: flight?.terminal || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: flight?.id,
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
          {flight ? (
            <>
              <Save className="h-5 w-5" />
              <span>Edit Flight {flight.flightNumber}</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span>Add New Flight</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                value={formData.flightNumber}
                onChange={(e) => handleChange("flightNumber", e.target.value)}
                placeholder="e.g., TA123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="airline">Airline</Label>
              <Input
                id="airline"
                value={formData.airline}
                onChange={(e) => handleChange("airline", e.target.value)}
                placeholder="e.g., TrackAir Internationals"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                placeholder="e.g., JFK"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                placeholder="e.g., LAX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure">Departure Time</Label>
              <Input
                id="departure"
                value={formData.departure}
                onChange={(e) => handleChange("departure", e.target.value)}
                placeholder="e.g., 10:30 AM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival">Arrival Time</Label>
              <Input
                id="arrival"
                value={formData.arrival}
                onChange={(e) => handleChange("arrival", e.target.value)}
                placeholder="e.g., 2:15 PM"
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
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="departed">Departed</SelectItem>
                  <SelectItem value="arrived">Arrived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="terminal">Terminal</Label>
              <Input
                id="terminal"
                value={formData.terminal}
                onChange={(e) => handleChange("terminal", e.target.value)}
                placeholder="e.g., Terminal 1"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="gate">Gate</Label>
              <Input
                id="gate"
                value={formData.gate}
                onChange={(e) => handleChange("gate", e.target.value)}
                placeholder="e.g., A12"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Flight
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
