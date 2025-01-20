import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useMapContext } from "@/contexts/MapContext";
import Icon, { IconName } from "@/components/icons/Icon";

const CustomMarker = ({ lng, lat ,experience}: { lng: number; lat: number , experience: IconName }) => {
  const { mapRef, isMapReady } = useMapContext();
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef || !isMapReady || !markerRef.current) return;

    const marker = new mapboxgl.Marker({
      element: markerRef.current,
    })
      .setLngLat([lng, lat])
      .addTo(mapRef);

    mapRef.setCenter([lng, lat]);
    console.log(markerRef.current);

    return () => {
      marker.remove();
    };
  }, [isMapReady]);

  return (
      <div
      className="marker"
      ref={markerRef}
      >
      <Icon name={experience}  />
    </div>
  );
}


export default CustomMarker

