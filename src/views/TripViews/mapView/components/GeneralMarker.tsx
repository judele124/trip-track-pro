import { Map } from "mapbox-gl";
import { ReactNode, RefObject, useRef } from "react";
import useMarker from "../hooks/useMarker";

interface IGeneralMarkerProps {
  location: { lat: number; lon: number };
  mapRef: RefObject<Map | null>;
  isMapReady: boolean;
  children: ReactNode;
}

export default function GeneralMarker({
  location,
  mapRef,
  isMapReady,
  children,
}: IGeneralMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMarker({
    ref,
    location,
    isMapReady,
    mapRef,
  });

  return <div ref={ref}>{children}</div>;
}
