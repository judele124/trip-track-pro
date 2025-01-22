import UserMarker from "@/views/mapView/components/UserMarker";
import GuideMarker from "@/views/mapView/components/GuideMarker";
import { Fragment, useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import GeneralMarker from "@/views/mapView/components/GeneralMarker";
import { useRoute } from "./hooks/useRoute";
import { useMapContext } from "@/contexts/MapContext";
import { map } from "zod";
import CustomMarker from "./components/CustomMarker";

const INITIAL_CENTER: [number, number] = [-74.0242, 40.6941];
const INITIAL_ZOOM: number = 10.12;

export default function MapInit() {
  const conatinerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const {
    setMapRefContext,
    setMapReady,
    isMapReady,
    experiencePoints,
    travelsPoints,
  } = useMapContext();
  const { createRoute } = useRoute();

  useEffect(() => {
    if (!conatinerRef.current) {
      return;
    }
    mapboxgl.accessToken =
      "pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg";

    mapRef.current = new Map({
      container: conatinerRef.current,
      style: "mapbox://styles/judele/cm3vihtvp00dn01sd34tthl00",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.on("load", () => {
      setMapReady(true);
      setMapRefContext(mapRef.current);
    });
  }, []);

  useEffect(() => {
    if (isMapReady) {
      // Small delay to ensure markers are rendered first
      setTimeout(() => {
        createRoute(experiencePoints.map((point) => point.location));
      }, 100);
    }
  }, [isMapReady, createRoute]);

  return (
    <div className="page-colors mx-auto h-screen max-w-[400px]">
      <div ref={conatinerRef} className="h-full w-full"></div>
      {isMapReady &&
        travelsPoints.map((p, index) => {
          if (p.rule === "guide") {
            return (
              <Fragment key={index}>
                <GeneralMarker
                  isMapReady={isMapReady}
                  location={{ lat: p.location[1], lon: p.location[0] }}
                  mapRef={mapRef}
                >
                  <GuideMarker />
                </GeneralMarker>
              </Fragment>
            );
          } else {
            return (
              <Fragment key={index}>
                <GeneralMarker
                  isMapReady={isMapReady}
                  location={{ lat: p.location[1], lon: p.location[0] }}
                  mapRef={mapRef}
                >
                  <UserMarker />
                </GeneralMarker>
              </Fragment>
            );
          }
        })}
      {isMapReady &&
        experiencePoints.map((p, index) => (
          <Fragment key={index}>
            <GeneralMarker
              isMapReady={isMapReady}
              location={{ lat: p.location[1], lon: p.location[0] }}
              mapRef={mapRef}
            >
              <CustomMarker experienceName={p.Experience} />
            </GeneralMarker>
          </Fragment>
        ))}
    </div>
  );
}
