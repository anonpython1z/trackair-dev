import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CourierCard, type CourierShipment } from "@/components/CourierCard";
import { Package, TrendingUp, Clock, Globe } from "lucide-react";
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

// Mock courier data
const mockShipments: CourierShipment[] = [
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
  {
    id: "4",
    trackingNumber: "TA-PKG-004",
    service: "Economy",
    origin: "Dubai, UAE",
    destination: "Mumbai, IN",
    departure: "Dec 12, 11:00 AM",
    estimatedDelivery: "Dec 16, 4:00 PM",
    status: "arrived",
    weight: "0.8 kg",
    dimensions: "20x15x8 cm",
  },
  {
    id: "5",
    trackingNumber: "TA-PKG-005",
    service: "Express",
    origin: "Frankfurt, DE",
    destination: "São Paulo, BR",
    departure: "Dec 14, 7:30 PM",
    estimatedDelivery: "Dec 17, 10:00 AM",
    status: "departed",
    weight: "3.7 kg",
    dimensions: "35x25x20 cm",
    carrier: "Flight TA007",
  },
];

const Courier = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filteredShipments = useMemo(() => {
    return mockShipments.filter((shipment) => {
      if (
        searchTerm &&
        !shipment.trackingNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        !shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (statusFilter !== "all" && shipment.status !== statusFilter) {
        return false;
      }
      if (serviceFilter !== "all" && shipment.service !== serviceFilter) {
        return false;
      }
      return true;
    });
  }, [searchTerm, statusFilter, serviceFilter]);

  const stats = useMemo(() => {
    const total = mockShipments.length;
    const inTransit = mockShipments.filter(
      (s) => s.status === "on-time" || s.status === "boarding",
    ).length;
    const delayed = mockShipments.filter((s) => s.status === "delayed").length;
    const delivered = mockShipments.filter(
      (s) => s.status === "arrived",
    ).length;

    return { total, inTransit, delayed, delivered };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl">
              <Package className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            TrackAir Courier Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Global package tracking and delivery services. Track your shipments
            worldwide with real-time updates and precise delivery estimates.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Shipments
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Active today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <TrendingUp className="h-4 w-4 text-status-ontime" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-ontime">
                {stats.inTransit}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.inTransit / stats.total) * 100)}% of
                shipments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delayed</CardTitle>
              <Clock className="h-4 w-4 text-status-delayed" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-delayed">
                {stats.delayed}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.delayed / stats.total) * 100)}% of shipments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.delivered}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Track Packages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Search by Tracking Number or Location
                </label>
                <Input
                  placeholder="e.g., TA-PKG-001 or New York"
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
                    <SelectItem value="on-time">On Time</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="boarding">In Transit</SelectItem>
                    <SelectItem value="departed">Out for Delivery</SelectItem>
                    <SelectItem value="arrived">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All services</SelectItem>
                    <SelectItem value="Express">Express</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Next Day">Next Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setServiceFilter("all");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipment List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Active Shipments ({filteredShipments.length})
            </h2>
          </div>

          {filteredShipments.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No shipments found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search filters to find packages.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredShipments.map((shipment) => (
                <CourierCard key={shipment.id} shipment={shipment} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courier;
