import { useEffect, useRef } from 'react';
import { useMapContext } from '@/contexts/MapContext';
import mapboxgl from 'mapbox-gl';
import {useRoute} from './hooks/useRoute'
import CustomMarker from './components/CustomMarker';

import 'mapbox-gl/dist/mapbox-gl.css';
import { IconName } from '@/components/icons/Icon';

const INITIAL_CENTER: [number, number] = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

const experiencePoints: {location: [number, number], Experience: IconName}[] = [
    {location:[-74.006, 40.7128], Experience: "location"},
    {location:[-73.935242, 40.730610], Experience: "flag"},
    {location: [-73.984016, 40.7484], Experience: "location"},
    {location: [-73.9665, 40.7812], Experience: "location"}
];

const MapInit: React.FC = () => {
  const { setMapRef, setMapReady ,isMapReady} = useMapContext();
  const {createRoute} = useRoute();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg'

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/judele/cm3vihtvp00dn01sd34tthl00',
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    map.on('load', () => {
        setMapRef(map);
        setMapReady(true);
    });

    return () => {
      map.remove();
    };
  }, [setMapRef, setMapReady]);

  useEffect(() => {
    if (isMapReady) {
      // Small delay to ensure markers are rendered first
      setTimeout(() => {
        createRoute(experiencePoints.map(point => point.location));
      }, 100);
    }
  }, [isMapReady, createRoute]);
  
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
    {
    isMapReady && (
      experiencePoints.map((p , index) => {
        return <CustomMarker key={index} lng={p.location[0]} lat={p.location[1]} experience={p.Experience}/>}
      )
    )
  }
   </>
  );
};

export default MapInit;
