import Map from "./Map";
import { useEffect } from "react";
import { useTripContext } from "@/contexts/TripContext";
import { useNavigate } from "react-router-dom";
import { extractLocations } from "./hooks/extractLoctions";

export default function MapView() {
  const { trip } = useTripContext();
  const stops = extractLocations(trip);

  const nav = useNavigate();
  
  useEffect(() => {
    if (!trip) nav("/404");
  }, []);

  return (
    <div className="page-colors mx-auto h-full max-w-[400px]">
      <Map routeOriginalPoints={stops}></Map>
    </div>
  );
}
