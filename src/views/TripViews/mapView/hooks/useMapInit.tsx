import { RefObject, useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Map as MB_Map } from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@/env.config";

const INITIAL_CENTER: [number, number] = [-74.0242, 40.6941];
const INITIAL_ZOOM: number = 10.12;
const MAX_BOX_STYLE = "mapbox://styles/mapbox/outdoors-v11";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface useMapInitReturn {
  isMapReady: boolean;
  mapRef: React.MutableRefObject<Map | null>;
}

export default function useMapInit(
  containerRef: RefObject<HTMLDivElement>,
): useMapInitReturn {
  const [isMapReady, setMapReady] = useState<boolean>(false);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = new MB_Map({
      container: containerRef.current,
      style: MAX_BOX_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.on("load", () => {
      setMapReady(true);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return { isMapReady, mapRef };
}
