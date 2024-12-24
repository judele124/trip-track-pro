import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_CENTER: [number, number] = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

const Map: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null); 
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg';

    mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/judele/cm3vihtvp00dn01sd34tthl00',
        center: center,
        zoom: zoom,
        interactive: true,
        attributionControl: false,
        logoPosition: undefined, 
      });

    mapRef.current.on('move', () => {
      if (!mapRef.current) return;

      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []); 

  return (
    <>
        <style>
        {`
          .mapboxgl-ctrl-logo {
            display: none !important;
          }
        `}
      </style>
      <div id="map-container" style={{ width: '100%', height: '100%' }} ref={mapContainerRef}  />
    </>
  );
};

export default Map;