import MapContextProvider from "@/contexts/MapContext";
import useMapInit from "./hooks/useMapInit";
import { ReactNode, useRef } from "react";
import { useMapRoute } from "./hooks/useMapRoute";
import { Types } from "trip-track-package";

interface MapProps {
  children?: ReactNode;
  routeOriginalPoints: Types["Trip"]["Stop"]["Model"]["location"][];
}

export default function Map({ children, routeOriginalPoints }: MapProps) {
  const conatinerRef = useRef<HTMLDivElement>(null);
  const { isMapReady, mapRef } = useMapInit(conatinerRef);
  useMapRoute({ points: routeOriginalPoints, mapRef, isMapReady });

  return (
    <MapContextProvider isMapReady={isMapReady} mapRef={mapRef}>
      <div ref={conatinerRef} className="h-full w-full"></div>
      {children}
    </MapContextProvider>
  );
}
