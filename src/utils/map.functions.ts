import { MapBoxDirectionsResponse } from '@/types/map';
import { Map } from 'mapbox-gl';

export function addRouteToMap(map: Map, routeData: MapBoxDirectionsResponse) {
	if (map.getSource('route')) {
		try {
			map.removeLayer('route');
			map.removeSource('route');
		} catch (error) {
			console.error('Error removing existing route:', error);
		}
	}

	map.addSource('route', {
		type: 'geojson',
		data: routeData.routes[0].geometry,
	});

	map.addLayer({
		id: 'route',
		type: 'line',
		source: 'route',
		layout: {
			'line-join': 'round',
			'line-cap': 'round',
		},
		paint: {
			'line-color': '#3887be',
			'line-width': 5,
			'line-opacity': 0.75,
		},
	});
}
