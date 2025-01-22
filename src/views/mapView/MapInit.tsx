import UserMarker from "@/views/mapView/components/UserMarker";
import GuideMarker from "@/views/mapView/components/GuideMarker";
import { useEffect, useRef } from "react";
import GeneralMarker from "@/views/mapView/components/GeneralMarker";
import { useRoute } from "./hooks/useRoute";
import { useMapContext } from "@/contexts/MapContext";
import CustomMarker from "./components/CustomMarker";
import mapboxgl, { Map } from "mapbox-gl";


const INITIAL_CENTER: [number, number] = [-74.0242, 40.6941];
const INITIAL_ZOOM: number = 10.12;

export default function MapInit() {
  const conatinerRef = useRef<HTMLDivElement>(null);

  const {
    mapRef,
    setMapReady,
    isMapReady,
    experiencePoints,
    travelsPoints,
  } = useMapContext();
  mapboxgl.accessToken = 'pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg';
  const { createRoute } = useRoute();

  useEffect(() => {
    if (!conatinerRef.current) {
      return;
    }

    mapRef.current = new Map({
      container: conatinerRef.current,
      style: "mapbox://styles/judele/cm3vihtvp00dn01sd34tthl00",
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

  useEffect(() => {
    if (isMapReady) {
      setTimeout(() => {        
        createRoute(experiencePoints.map((point) => point.location));
      }, 100)
    }
  }, [isMapReady]);

  return (
    <div className="page-colors mx-auto h-screen max-w-[400px]">
      <div ref={conatinerRef} className="h-full w-full"></div>
      {isMapReady &&
        travelsPoints.map((p, index) => {
          if (p.rule === "guide") {
            return (
              <GeneralMarker
                key={index}
                isMapReady={isMapReady}
                location={{ lat: p.location[1], lon: p.location[0] }}
                mapRef={mapRef}
              >
                <GuideMarker />
              </GeneralMarker>
            );
          } else {
            return (
              <GeneralMarker
                key={index}
                isMapReady={isMapReady}
                location={{ lat: p.location[1], lon: p.location[0] }}
                mapRef={mapRef}
              >
                <UserMarker />
              </GeneralMarker>
            );
          }
        })}
      {isMapReady &&
        experiencePoints.map((p, index) => (
          <GeneralMarker
            key={index}
            isMapReady={isMapReady}
            location={{ lat: p.location[1], lon: p.location[0] }}
            mapRef={mapRef}
          >
            <CustomMarker experienceName={p.Experience} />
          </GeneralMarker>
        ))}
    </div>
  );
}
