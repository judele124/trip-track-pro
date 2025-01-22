import { useMapContext } from '@/contexts/MapContext';
import mapboxgl from 'mapbox-gl';

export const useRoute = () => {
    const { mapRef : { current : mapRefCurrent} } = useMapContext();

    const createRoute = async (points: [number, number][]) => {
        if (!mapRefCurrent || !mapRefCurrent.loaded()) {
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
            console.log(json);
            

            if (mapRefCurrent.getSource('route')) {
                try {
                    mapRefCurrent.removeLayer('route');
                    mapRefCurrent.removeSource('route');
                } catch (error) {
                    console.error('Error removing existing route:', error);
                }
            }

            mapRefCurrent.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: json.routes[0].geometry
                }
            });

            mapRefCurrent.addLayer({
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