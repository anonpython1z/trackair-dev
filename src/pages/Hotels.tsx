import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HotelCard, type HotelBooking } from "@/components/HotelCard";
import { Hotel, TrendingUp, Clock, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock hotel data
const mockHotels: HotelBooking[] = [
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
  {
    id: "3",
    confirmationNumber: "SE-HTL-003",
    hotelName: "Downtown Business Hotel",
    brand: "StayEase Business",
    location: "Chicago, IL",
    checkIn: "Dec 15, 2:00 PM",
    checkOut: "Dec 17, 11:00 AM",
    guests: 1,
    roomType: "Business King Room",
    status: "checked-out",
    rating: 4,
    pricePerNight: 149,
    totalPrice: 298,
    amenities: ["WiFi", "Business Center", "Gym"],
    roomNumber: "815",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
  },
  {
    id: "4",
    confirmationNumber: "SE-HTL-004",
    hotelName: "Mountain View Lodge",
    brand: "StayEase Nature",
    location: "Denver, CO",
    checkIn: "Dec 25, 3:00 PM",
    checkOut: "Dec 28, 10:00 AM",
    guests: 3,
    roomType: "Mountain View Suite",
    status: "available",
    rating: 5,
    pricePerNight: 249,
    totalPrice: 747,
    amenities: ["WiFi", "Fireplace", "Balcony", "Ski Storage"],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
  },
];

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredHotels = useMemo(() => {
    return mockHotels.filter((hotel) => {
      if (
        searchTerm &&
        !hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !hotel.confirmationNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        !hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (statusFilter !== "all" && hotel.status !== statusFilter) {
        return false;
      }
      if (
        locationFilter !== "all" &&
        !hotel.location.toLowerCase().includes(locationFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [searchTerm, statusFilter, locationFilter]);

  const stats = useMemo(() => {
    const total = mockHotels.length;
    const confirmed = mockHotels.filter(
      (h) => h.status === "booking" || h.status === "checked-in",
    ).length;
    const checkedIn = mockHotels.filter(
      (h) => h.status === "checked-in",
    ).length;
    const available = mockHotels.filter((h) => h.status === "available").length;

    return { total, confirmed, checkedIn, available };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-red-500/5 to-background rounded-2xl border border-border/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative text-center space-y-8 py-16 px-8">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl">
                  <Hotel className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent leading-tight">
                StayEase Hotels
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience luxury and comfort with our premium hotel network.
              <span className="text-orange-500 font-semibold">
                {" "}
                Book, manage, and track
              </span>{" "}
              your accommodations worldwide with ease and style.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-500">
                  Premium Locations
                </span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">
                  Global Network
                </span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                <Calendar className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">
                  Instant Booking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-orange-500">
                Total Bookings
              </CardTitle>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Hotel className="h-4 w-4 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground">
                {stats.total}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-orange-500 rounded-full mr-1 animate-pulse"></div>
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-status-ontime/10 to-status-ontime/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-status-ontime/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-status-ontime">
                Confirmed
              </CardTitle>
              <div className="p-2 bg-status-ontime/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-status-ontime" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-status-ontime">
                {stats.confirmed}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-status-ontime rounded-full mr-1 animate-pulse"></div>
                Active reservations
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-blue-500">
                Checked In
              </CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-blue-500">
                {stats.checkedIn}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full mr-1 animate-pulse"></div>
                Currently staying
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-green-500">
                Available
              </CardTitle>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <MapPin className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-green-500">
                {stats.available}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <div className="w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Ready to book
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-2 border-dashed border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Hotel className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Find Your Perfect Stay</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Search Hotels or Confirmation
                </label>
                <Input
                  placeholder="e.g., SE-HTL-001 or Grand Central"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="booking">Confirmed</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="new york">New York</SelectItem>
                    <SelectItem value="miami">Miami</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="denver">Denver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setLocationFilter("all");
                  }}
                  variant="outline"
                  className="border-orange-500/20 hover:bg-orange-500/10"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotel List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Hotel Bookings ({filteredHotels.length})
            </h2>
          </div>

          {filteredHotels.length === 0 ? (
            <div className="text-center py-12">
              <Hotel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No hotels found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search filters to find hotels.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} booking={hotel} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Hotels;
