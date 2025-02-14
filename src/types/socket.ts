import { Socket } from "socket.io-client";
import { Types } from "trip-track-package";

export interface ServerToClientEvents {
  tripJoined: (userSocketId: string) => void;
  locationUpdated: (
    userId: string,
    location: { lat: number; lon: number },
  ) => void;
  tripStatusChanged: (
    tripId: Types["Trip"]["Model"]["_id"],
    status: string,
  ) => void;
  error: (
    data: { errorDetails: Record<string, any>; message: string } | string,
  ) => void;
}

export interface ClientToServerEvents {
  joinTrip: (tripId: Types["Trip"]["Model"]["_id"]) => void;
  updateLocation: (
    tripId: Types["Trip"]["Model"]["_id"],
    { lon, lat }: { lon: number; lat: number },
  ) => void;
  "connect-error": (error: Error) => void;
}

export type SocketClientType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
