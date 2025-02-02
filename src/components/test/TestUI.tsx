import UserMarker from "@/views/mapView/components/UserMarker";
import Icon from "../icons/Icon";
import GuideMarker from "@/views/mapView/components/GuideMarker";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import GeneralMarker from "@/views/mapView/components/GeneralMarker";
import StopMarker from "@/views/mapView/components/StopMarker";
export default function TestUI() {
  const conatinerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [isMapReady, setMapReady] = useState(false);
  useEffect(() => {
    if (!conatinerRef.current) {
      return;
    }
    mapboxgl.accessToken =
      "pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg";

    mapRef.current = new Map({
      container: conatinerRef.current,
      style: "mapbox://styles/judele/cm3vihtvp00dn01sd34tthl00",
      center: [10, 10],
      zoom: 10,
    });

    mapRef.current.on("load", () => {
      setMapReady(true);
    });
  }, []);

  return (
    <div className="page-colors mx-auto h-screen max-w-[400px]">
      <div ref={conatinerRef} className="h-full w-full"></div>
      {/* <GeneralMarker
        isMapReady={isMapReady}
        location={{ lat: 10, lon: 10 }}
        mapRef={mapRef}
      >
        <GuideMarker />
      </GeneralMarker>

      <GeneralMarker
        isMapReady={isMapReady}
        location={{ lat: 15, lon: 20 }}
        mapRef={mapRef}
      >
        <UserMarker />
      </GeneralMarker> */}

      <GeneralMarker
        isMapReady={isMapReady}
        location={{ lat: 15, lon: 20 }}
        mapRef={mapRef}
      >
        <StopMarker />
      </GeneralMarker>

      {/* <div className="flex flex-wrap gap-5">
        <Icon name={"alert"} />
        <Icon name={"participants"} />
        <Icon name={"chat"} />
      </div> */}
    </div>
  );
}
