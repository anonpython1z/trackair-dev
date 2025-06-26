import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type FlightStatus =
  | "on-time"
  | "delayed"
  | "cancelled"
  | "boarding"
  | "departed"
  | "arrived";

interface StatusBadgeProps {
  status: FlightStatus;
  className?: string;
}

const statusConfig: Record<
  FlightStatus,
  { label: string; variant: string; className: string }
> = {
  "on-time": {
    label: "On Time",
    variant: "default",
    className: "bg-status-ontime text-white",
  },
  delayed: {
    label: "Delayed",
    variant: "secondary",
    className: "bg-status-delayed text-black",
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive",
    className: "bg-status-cancelled text-white",
  },
  boarding: {
    label: "Boarding",
    variant: "default",
    className: "bg-status-boarding text-white",
  },
  departed: {
    label: "Departed",
    variant: "secondary",
    className: "bg-muted text-muted-foreground",
  },
  arrived: {
    label: "Arrived",
    variant: "default",
    className: "bg-status-ontime text-white",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, className)}>{config.label}</Badge>
  );
};
