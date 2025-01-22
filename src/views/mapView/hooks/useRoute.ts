import { useMapContext } from '@/contexts/MapContext';
import mapboxgl from 'mapbox-gl';

export const useRoute = () => {
    const { mapRefContext: mapRef } = useMapContext();

    const createRoute = async (points: [number, number][]) => {
        if (!mapRef || !mapRef.loaded()) {
            console.log('Map not initialized yet');
            return;
        }
        
        try {
            const coords = points.join(';');
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const json = await query.json();

            if (mapRef.getSource('route')) {
                try {
                    mapRef.removeLayer('route');
                    mapRef.removeSource('route');
                } catch (error) {
                    console.error('Error removing existing route:', error);
                }
            }

            mapRef.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: json.routes[0].geometry
                }
            });

            mapRef.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        } catch (error) {
            console.error('Error creating route:', error);
        }
    };

    return { createRoute };
};