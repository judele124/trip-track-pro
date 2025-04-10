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

type Point = { lon: number; lat: number };

export function calculateDistanceOnEarth(
	{ lat: lat1, lon: lon1 }: Point,
	{ lat: lat2, lon: lon2 }: Point
) {
	const R = 6371; // Radius of Earth in kilometers
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in kilometers
}
