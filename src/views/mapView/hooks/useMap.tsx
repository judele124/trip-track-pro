import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
export const useMap = (container: React.RefObject<HTMLDivElement>, onMapClick: (e: mapboxgl.MapMouseEvent) => void) => {
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!container.current) return;

    map.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 10,
    });

    map.current.on('load', () => {
      map.current?.on('click', onMapClick);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return map;
};