import { LngLat } from 'mapbox-gl';
export interface Point {
    lngLat: LngLat;
    marker: mapboxgl.Marker;
    index: number;
}