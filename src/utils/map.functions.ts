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

type Point = [number, number];

export function calculateDistanceOnEarth(
	[lat1, lon1]: Point,
	[lat2, lon2]: Point
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

export function findNextStepPoint(
	userLocation: Point,
	routePoints: Point[],
	lastStepIndex: number
): number {
	let nextClosestStepIndex = -1;
	let minDistanceToNextStep = Infinity;

	for (let i = 0; i < routePoints.length; i++) {
		const distance = calculateDistanceOnEarth(userLocation, routePoints[i]);

		if (distance < minDistanceToNextStep) {
			minDistanceToNextStep = distance;
			nextClosestStepIndex = i;
		}
	}

	// If we couldn't find a next station, use the last point of the route
	if (nextClosestStepIndex === -1) {
		nextClosestStepIndex = routePoints.length - 1;
	}
	return nextClosestStepIndex;
}

export function distanceToSegment(point: Point, segment: Point[]) {
	const [p1, p2] = segment;
	// Convert to Cartesian coordinates (simplified for small distances)
	const x = point[0] - p1[0];
	const y = point[1] - p1[1];
	const dx = p2[0] - p1[0];
	const dy = p2[1] - p1[1];

	const segmentLengthSquared = dx * dx + dy * dy;
	if (segmentLengthSquared === 0) return calculateDistanceOnEarth(point, p1);

	// Project point onto segment
	const t = Math.max(0, Math.min(1, (x * dx + y * dy) / segmentLengthSquared));
	const projectionLon = p1[0] + t * dx;
	const projectionLat = p1[1] + t * dy;

	return calculateDistanceOnEarth(point, [projectionLon, projectionLat]);
}
export function isOutOfRouteBetweenSteps({
	lastStepIndex,
	routePoints,
	threshold = 0.05, // 50 meters = 0.05 kilometers
	userLocation,
}: {
	userLocation: Point;
	routePoints: Point[];
	lastStepIndex: number;
	threshold: number;
}) {
	// Find the next segment based on user's progress along the route
	const nextStationIndex = findNextStepPoint(
		userLocation,
		routePoints,
		lastStepIndex
	);
	const prevIndex = Math.max(0, nextStationIndex - 1);
	const segment = [routePoints[prevIndex], routePoints[nextStationIndex]];
	// Calculate distance to this segment
	const distance = distanceToSegment(userLocation, segment);

	return { isOut: distance > threshold, nextStationIndex };
}
