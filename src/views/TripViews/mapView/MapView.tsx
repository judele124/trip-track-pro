import { Types } from "trip-track-package";
import Map from "./Map";
import { useEffect } from "react";
import { useTripContext } from "@/contexts/TripContext";
import { useNavigate } from "react-router-dom";

const stops: Types["Trip"]["Stop"]["Model"][] = [
  {
    location: { lon: 34.8153893, lat: 31.8855383 },
    address: "יעקב מדהלה 1, Rehovot, Israel",
  },
  {
    location: { lon: 34.8025448, lat: 31.9662577 },
    address:
      "תחנה מרכזית הישנה בראשון לציון, Herzl Street, Rishon LeTsiyon, Israel",
  },
  {
    location: { lon: 34.774915, lat: 31.990604 },
    address: "קניון הזהב, David Saharov Street, Rishon LeTsiyon, Israel",
  },
];

export default function MapView() {
  const { trip } = useTripContext();
  const nav = useNavigate();

  useEffect(() => {
    if (!trip) {
      nav("/404");
    }
  }, []);

  return (
    <div className="page-colors mx-auto h-full max-w-[400px]">
      <Map routeOriginalPoints={stops.map((s) => s.location)} />
    </div>
  );
}
