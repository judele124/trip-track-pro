import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../env.config";

interface ITripSocket {
  tripId: string;
  socket: Socket | null;
}

interface ITripSocketContext {
  tripSocket: ITripSocket | null;
  setTripSocket: (tripId: string) => void;
}

interface ITripSocketProviderProps {
  children: ReactNode;
}

const tripSocketContext = createContext<ITripSocketContext | null>(null);

export default function TripSocketProvider({
  children,
}: ITripSocketProviderProps) {
  const [tripSocket, setTripSocketState] = useState<ITripSocket | null>(null);

  useEffect(() => {
    if (!tripSocket?.tripId) {
      return;
    }

    const socket = io(API_BASE_URL, {
      query: { tripId: tripSocket.tripId },
    });

    setTripSocketState((prev) => ({ ...prev!, socket }));

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [tripSocket?.tripId]);

  const setTripSocket = (tripId: string) => {
    setTripSocketState({ tripId, socket: null });
  };

  return (
    <tripSocketContext.Provider value={{ tripSocket, setTripSocket }}>
      {children}
    </tripSocketContext.Provider>
  );
}

export const useTripSocket = () => {
  const context = useContext(tripSocketContext);
  if (!context) {
    throw new Error("useTripSocket must be used within a TripSocketProvider");
  }
  return context;
};
