import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminFlightForm } from "./AdminFlightForm";
import { FlightCard, type Flight } from "./FlightCard";
import { CourierCard, type CourierShipment } from "./CourierCard";
import { AdminCourierForm } from "./AdminCourierForm";
import { HotelCard, type HotelBooking } from "./HotelCard";
import { AdminHotelForm } from "./AdminHotelForm";
import { AdminSettings } from "./AdminSettings";
import {
  Plane,
  Package,
  Hotel,
  Settings,
  Users,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminTabsProps {
  flights: Flight[];
  shipments: CourierShipment[];
  hotels: HotelBooking[];
  onSaveFlight: (flight: Omit<Flight, "id"> & { id?: string }) => void;
  onSaveShipment: (
    shipment: Omit<CourierShipment, "id"> & { id?: string },
  ) => void;
  onSaveHotel: (hotel: Omit<HotelBooking, "id"> & { id?: string }) => void;
  onDeleteFlight: (id: string) => void;
  onDeleteShipment: (id: string) => void;
  onDeleteHotel: (id: string) => void;
}

export const AdminTabs = ({
  flights,
  shipments,
  hotels,
  onSaveFlight,
  onSaveShipment,
  onSaveHotel,
  onDeleteFlight,
  onDeleteShipment,
  onDeleteHotel,
}: AdminTabsProps) => {
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [editingShipment, setEditingShipment] =
    useState<CourierShipment | null>(null);
  const [editingHotel, setEditingHotel] = useState<HotelBooking | null>(null);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [showHotelForm, setShowHotelForm] = useState(false);

  const handleEditFlight = (flight: Flight) => {
    setEditingFlight(flight);
    setShowFlightForm(true);
  };

  const handleEditShipment = (shipment: CourierShipment) => {
    setEditingShipment(shipment);
    setShowShipmentForm(true);
  };

  const handleEditHotel = (hotel: HotelBooking) => {
    setEditingHotel(hotel);
    setShowHotelForm(true);
  };

  const handleSaveFlightWrapper = (
    flightData: Omit<Flight, "id"> & { id?: string },
  ) => {
    onSaveFlight(flightData);
    setEditingFlight(null);
    setShowFlightForm(false);
  };

  const handleSaveShipmentWrapper = (
    shipmentData: Omit<CourierShipment, "id"> & { id?: string },
  ) => {
    onSaveShipment(shipmentData);
    setEditingShipment(null);
    setShowShipmentForm(false);
  };

  const handleSaveHotelWrapper = (
    hotelData: Omit<HotelBooking, "id"> & { id?: string },
  ) => {
    onSaveHotel(hotelData);
    setEditingHotel(null);
    setShowHotelForm(false);
  };

  const handleCancelFlightForm = () => {
    setEditingFlight(null);
    setShowFlightForm(false);
  };

  const handleCancelShipmentForm = () => {
    setEditingShipment(null);
    setShowShipmentForm(false);
  };

  const handleCancelHotelForm = () => {
    setEditingHotel(null);
    setShowHotelForm(false);
  };

  const flightStats = {
    total: flights.length,
    active: flights.filter(
      (f) => f.status === "on-time" || f.status === "boarding",
    ).length,
    delayed: flights.filter((f) => f.status === "delayed").length,
  };

  const shipmentStats = {
    total: shipments.length,
    inTransit: shipments.filter(
      (s) => s.status === "on-time" || s.status === "boarding",
    ).length,
    delayed: shipments.filter((s) => s.status === "delayed").length,
  };

  const hotelStats = {
    total: hotels.length,
    confirmed: hotels.filter(
      (h) => h.status === "booking" || h.status === "checked-in",
    ).length,
    checkedIn: hotels.filter((h) => h.status === "checked-in").length,
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview" className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="flights" className="flex items-center space-x-2">
          <Plane className="h-4 w-4" />
          <span className="hidden sm:inline">Flights</span>
        </TabsTrigger>
        <TabsTrigger value="courier" className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span className="hidden sm:inline">Courier</span>
        </TabsTrigger>
        <TabsTrigger value="hotels" className="flex items-center space-x-2">
          <Hotel className="h-4 w-4" />
          <span className="hidden sm:inline">Hotels</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Flights
              </CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flightStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {flightStats.active} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Shipments
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shipmentStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {shipmentStats.inTransit} in transit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Hotels
              </CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hotelStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {hotelStats.confirmed} confirmed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-status-delayed" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-delayed">
                {flightStats.delayed + shipmentStats.delayed}
              </div>
              <p className="text-xs text-muted-foreground">Delayed items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
              <Activity className="h-4 w-4 text-status-ontime" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-ontime">
                Online
              </div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Flights</CardTitle>
              <CardDescription>Latest flight activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flights.slice(0, 3).map((flight) => (
                  <div
                    key={flight.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <Plane className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{flight.flightNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {flight.origin} → {flight.destination}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{flight.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Latest courier activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.slice(0, 3).map((shipment) => (
                  <div
                    key={shipment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                        <Package className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{shipment.trackingNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {shipment.origin} → {shipment.destination}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{shipment.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="flights" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Flight Management</h2>
            <p className="text-muted-foreground">
              Manage all domestic and international flights
            </p>
          </div>
          {!showFlightForm && (
            <Button onClick={() => setShowFlightForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Flight
            </Button>
          )}
        </div>

        {showFlightForm && (
          <AdminFlightForm
            flight={editingFlight || undefined}
            onSave={handleSaveFlightWrapper}
            onCancel={handleCancelFlightForm}
          />
        )}

        <div className="space-y-4">
          {flights.map((flight) => (
            <div key={flight.id} className="relative">
              <FlightCard flight={flight} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditFlight(flight)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteFlight(flight.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="courier" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Courier Management</h2>
            <p className="text-muted-foreground">
              Manage all package shipments and tracking
            </p>
          </div>
          {!showShipmentForm && (
            <Button onClick={() => setShowShipmentForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Shipment
            </Button>
          )}
        </div>

        {showShipmentForm && (
          <AdminCourierForm
            shipment={editingShipment || undefined}
            onSave={handleSaveShipmentWrapper}
            onCancel={handleCancelShipmentForm}
          />
        )}

        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="relative">
              <CourierCard shipment={shipment} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditShipment(shipment)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteShipment(shipment.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="hotels" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Hotel Management</h2>
            <p className="text-muted-foreground">
              Manage all hotel bookings and reservations
            </p>
          </div>
          {!showHotelForm && (
            <Button onClick={() => setShowHotelForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Hotel
            </Button>
          )}
        </div>

        {showHotelForm && (
          <AdminHotelForm
            hotel={editingHotel || undefined}
            onSave={handleSaveHotelWrapper}
            onCancel={handleCancelHotelForm}
          />
        )}

        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="relative">
              <HotelCard booking={hotel} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditHotel(hotel)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteHotel(hotel.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-12">
            <Hotel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hotels configured
            </h3>
            <p className="text-muted-foreground mb-4">
              Add your first hotel booking to get started with the management
              system.
            </p>
            <Button onClick={() => setShowHotelForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Hotel
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Performance metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Analytics Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Detailed analytics and reporting features will be available
                here.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <AdminSettings />
      </TabsContent>
    </Tabs>
  );
};
