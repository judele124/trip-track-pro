import { useCallback, useEffect, useRef, useState } from 'react';
import { useMap } from './hooks/useMap';
import { clearPoints } from './hooks/useMapPoints';
import { getRouteData } from './services/useNavigation';
import { CustomMarker } from './components/CustomMarker';
import { Point } from './types';
import RouteInfo from './components/RouteInfo';
import ClearRouteButton from './components/ClearRouteButton';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const maxStops = 4;
  const [points, setPoints] = useState<Point[]>([]);
  const [distance, setDistance] = useState<number | null>(null);


  const onMapClick = async (e: mapboxgl.MapMouseEvent) => {
    
    if (points.length >= maxStops) return;
    setPoints(prev => {
      console.log(";;;;;");
      
      const marker = new mapboxgl.Marker({
        element: CustomMarker({ index: prev.length }),
        anchor: 'center',
      }).setLngLat(e.lngLat).addTo(map.current!);
      
      const newPoint = { lngLat: e.lngLat, marker, index: prev.length };
      const updatedPoints = [...prev, newPoint];

      if (updatedPoints.length >= 2) {
        getRouteData(updatedPoints, mapboxgl.accessToken, setDistance)
          .then(route => {
            if (route && map.current) {

              if (map.current.getSource('route')) {
                map.current.removeLayer('route');
                map.current.removeSource('route');
              }

              map.current.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: route
                  }
                }
              });

              map.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#3b82f6', 'line-width': 4 },
              });
            }
          });
      }
      // console.log(updatedPoints);
      
      return updatedPoints;
    });
  }


  const map = useMap(mapContainer, onMapClick);

  useEffect(() => {
    // console.log(points);
  }, [points]);

 const clearP =  useCallback(() => clearPoints({ map, points, setPoints, setDistance }), [map, points]);
  
  return  (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      <div className='absolute top-4 left-4 flex flex-col gap-3 bg-white p-4 rounded-lg shadow-lg  '>
        <RouteInfo points={points} distance={distance} />
          {points.length >= 2 && <ClearRouteButton onClick={() => clearP()} />}
      </div>
    </div>
  );
};

export default Map;
