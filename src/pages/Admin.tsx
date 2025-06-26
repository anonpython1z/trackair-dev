import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { AdminLogin } from "@/components/AdminLogin";
import { Header } from "@/components/Header";
import { AdminTabs } from "@/components/AdminTabs";
import { type Flight } from "@/components/FlightCard";
import { type CourierShipment } from "@/components/CourierCard";
import { type HotelBooking } from "@/components/HotelCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Globe, Clock, LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Enhanced mock data with international flights
const initialFlights: Flight[] = [
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
];

const initialShipments: CourierShipment[] = [
  {
    id: "1",
    trackingNumber: "TA-PKG-001",
    service: "Express",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    departure: "Dec 15, 9:00 AM",
    estimatedDelivery: "Dec 16, 3:00 PM",
    status: "on-time",
    weight: "2.5 kg",
    dimensions: "30x20x15 cm",
    carrier: "Flight TA002",
  },
  {
    id: "2",
    trackingNumber: "TA-PKG-002",
    service: "Standard",
    origin: "London, UK",
    destination: "Paris, FR",
    departure: "Dec 14, 2:00 PM",
    estimatedDelivery: "Dec 16, 12:00 PM",
    status: "boarding",
    weight: "1.2 kg",
    dimensions: "25x15x10 cm",
    carrier: "Flight TA001",
  },
  {
    id: "3",
    trackingNumber: "TA-PKG-003",
    service: "Next Day",
    origin: "Tokyo, JP",
    destination: "Sydney, AU",
    departure: "Dec 13, 6:00 PM",
    estimatedDelivery: "Dec 15, 8:00 AM",
    status: "delayed",
    weight: "5.1 kg",
    dimensions: "40x30x25 cm",
    carrier: "Flight TA003",
  },
];

const initialHotels: HotelBooking[] = [
  {
    id: "1",
    confirmationNumber: "SE-HTL-001",
    hotelName: "Grand Central Plaza",
    brand: "StayEase Premium",
    location: "New York, NY",
    checkIn: "Dec 20, 3:00 PM",
    checkOut: "Dec 23, 11:00 AM",
    guests: 2,
    roomType: "Executive Suite",
    status: "booking",
    rating: 5,
    pricePerNight: 299,
    totalPrice: 897,
    amenities: ["WiFi", "Breakfast", "Gym", "Spa", "Parking"],
    roomNumber: "2501",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
  },
  {
    id: "2",
    confirmationNumber: "SE-HTL-002",
    hotelName: "Marina Bay Resort",
    brand: "StayEase Resort",
    location: "Miami, FL",
    checkIn: "Dec 18, 4:00 PM",
    checkOut: "Dec 22, 12:00 PM",
    guests: 4,
    roomType: "Ocean View Family Suite",
    status: "checked-in",
    rating: 4,
    pricePerNight: 189,
    totalPrice: 756,
    amenities: ["WiFi", "Pool", "Beach Access", "Restaurant"],
    roomNumber: "1205",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop",
  },
];

const Admin = () => {
  const { isAuthenticated, currentUser, login, logout } = useAdmin();
  const [flights, setFlights] = useState<Flight[]>(initialFlights);
  const [shipments, setShipments] =
    useState<CourierShipment[]>(initialShipments);
  const [hotels, setHotels] = useState<HotelBooking[]>(initialHotels);

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  const handleSaveFlight = (
    flightData: Omit<Flight, "id"> & { id?: string },
  ) => {
    if (flightData.id) {
      // Update existing flight
      setFlights((prev) =>
        prev.map((f) =>
          f.id === flightData.id ? { ...flightData, id: f.id } : f,
        ),
      );
      toast({
        title: "Flight Updated",
        description: `Flight ${flightData.flightNumber} has been updated successfully.`,
      });
    } else {
      // Add new flight
      const newFlight: Flight = {
        ...flightData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setFlights((prev) => [...prev, newFlight]);
      toast({
        title: "Flight Added",
        description: `Flight ${flightData.flightNumber} has been added successfully.`,
      });
    }
  };

  const handleSaveShipment = (
    shipmentData: Omit<CourierShipment, "id"> & { id?: string },
  ) => {
    if (shipmentData.id) {
      // Update existing shipment
      setShipments((prev) =>
        prev.map((s) =>
          s.id === shipmentData.id ? { ...shipmentData, id: s.id } : s,
        ),
      );
      toast({
        title: "Shipment Updated",
        description: `Shipment ${shipmentData.trackingNumber} has been updated successfully.`,
      });
    } else {
      // Add new shipment
      const newShipment: CourierShipment = {
        ...shipmentData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setShipments((prev) => [...prev, newShipment]);
      toast({
        title: "Shipment Added",
        description: `Shipment ${shipmentData.trackingNumber} has been added successfully.`,
      });
    }
  };

  const handleSaveHotel = (
    hotelData: Omit<HotelBooking, "id"> & { id?: string },
  ) => {
    if (hotelData.id) {
      // Update existing hotel
      setHotels((prev) =>
        prev.map((h) =>
          h.id === hotelData.id ? { ...hotelData, id: h.id } : h,
        ),
      );
      toast({
        title: "Hotel Updated",
        description: `Hotel ${hotelData.confirmationNumber} has been updated successfully.`,
      });
    } else {
      // Add new hotel
      const newHotel: HotelBooking = {
        ...hotelData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setHotels((prev) => [...prev, newHotel]);
      toast({
        title: "Hotel Added",
        description: `Hotel ${hotelData.confirmationNumber} has been added successfully.`,
      });
    }
  };

  const handleDeleteFlight = (flightId: string) => {
    const flight = flights.find((f) => f.id === flightId);
    setFlights((prev) => prev.filter((f) => f.id !== flightId));
    toast({
      title: "Flight Deleted",
      description: `Flight ${flight?.flightNumber} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleDeleteShipment = (shipmentId: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    setShipments((prev) => prev.filter((s) => s.id !== shipmentId));
    toast({
      title: "Shipment Deleted",
      description: `Shipment ${shipment?.trackingNumber} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleDeleteHotel = (hotelId: string) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    setHotels((prev) => prev.filter((h) => h.id !== hotelId));
    toast({
      title: "Hotel Deleted",
      description: `Hotel ${hotel?.confirmationNumber} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Enhanced Admin Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                TrackAir Admin Center
              </h1>
              <p className="text-muted-foreground flex items-center space-x-4">
                <span>Global Operations Management</span>
                <span className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>Worldwide Coverage</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Real-time Updates</span>
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">
                {currentUser?.username}
              </span>
              <Badge variant="outline" className="text-xs">
                {currentUser?.role}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Badge
                variant="secondary"
                className="bg-status-ontime text-white"
              >
                System Online
              </Badge>
              <Badge variant="outline">
                {flights.length + shipments.length + hotels.length} Active Items
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Comprehensive Admin Interface */}
        <AdminTabs
          flights={flights}
          shipments={shipments}
          hotels={hotels}
          onSaveFlight={handleSaveFlight}
          onSaveShipment={handleSaveShipment}
          onSaveHotel={handleSaveHotel}
          onDeleteFlight={handleDeleteFlight}
          onDeleteShipment={handleDeleteShipment}
          onDeleteHotel={handleDeleteHotel}
        />
      </main>
    </div>
  );
};

export default Admin;
