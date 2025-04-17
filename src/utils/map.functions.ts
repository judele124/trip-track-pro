import { MapBoxDirectionsResponse } from '@/types/map';
import {
	Map,
	LayerSpecification,
	CircleLayerSpecification,
	GeoJSONSource,
	GeoJSONSourceSpecification,
} from 'mapbox-gl';

type Point = [number, number];

// map drawing functions
export function addRouteToMap(
	key: string,
	map: Map,
	routeData: MapBoxDirectionsResponse
) {
	const sourceData: GeoJSONSourceSpecification = {
		type: 'geojson',
		data: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: routeData.routes[0].geometry.coordinates,
			},
		},
	};

	const layerData: LayerSpecification = {
		id: key,
		type: 'line',
		source: key,
		layout: {
			'line-join': 'round',
			'line-cap': 'round',
		},
		paint: {
			'line-color': '#3887be',
			'line-width': 5,
			'line-opacity': 0.75,
		},
	};

	addSourceAndLayerToMap(key, map, sourceData, layerData);
}

export function addSourceAndLayerToMap(
	key: string,
	map: Map,
	sourceData: GeoJSONSourceSpecification,
	layerData: LayerSpecification
) {
	if (!sourceData.data) {
		throw new Error("sourceData.data doesn't exist");
	}

	const existingSource = map.getSource(key);

	if (existingSource) {
		if (existingSource.type === 'geojson') {
			try {
				existingSource.setData(sourceData.data);
				return;
			} catch (error) {
				console.error('Error updating existing route:', error);
			}
		} else {
			try {
				map.removeLayer(key);
				map.removeSource(key);
			} catch (error) {
				console.error('Error removing existing route:', error);
			}
		}
	}

	map.addSource(key, sourceData);

	if (!map.getLayer(key)) {
		map.addLayer(layerData);
	}
}

export function addCircleRadiusToLocation<K extends string>(
	key: K,
	map: Map,
	coordinates: [number, number],
	circleData: CircleLayerSpecification
) {
	const sourceData: GeoJSONSourceSpecification = {
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates,
					},
				},
			],
		},
	};

	addSourceAndLayerToMap(key, map, sourceData, circleData);
}

// map navigation helper functions

export function calculateDistanceOnEarth(
	[lat1, lon1]: Point,
	[lat2, lon2]: Point
) {
	const R = 6378137; // Radius of Earth in meters
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in meters
}

export function findClosestPoint(
	userLocation: Point,
	routePoints: Point[],
	lastStepIndex: number
): number {
	let nextClosestStepIndex = -1;
	let minDistanceToNextStep = Infinity;
	for (
		let i = Math.max(0, lastStepIndex - 3);
		i < lastStepIndex + 3 && i < routePoints.length;
		i++
	) {
		const [lon, lat] = routePoints[i];
		const distance = calculateDistanceOnEarth(userLocation, [lat, lon]);
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
	const [lon1, lat1] = segment[0]; // Convert to [lat, lon]
	const [lon2, lat2] = segment[1];

	const p1: Point = [lat1, lon1];
	const p2: Point = [lat2, lon2];

	// Continue using the original logic with converted points
	const x = point[1] - p1[1]; // delta lon
	const y = point[0] - p1[0]; // delta lat
	const dx = p2[1] - p1[1]; // delta lon of segment
	const dy = p2[0] - p1[0]; // delta lat of segment

	const segmentLengthSquared = dx * dx + dy * dy;
	if (segmentLengthSquared === 0) {
		return calculateDistanceOnEarth(point, p1);
	}

	const t = Math.max(0, Math.min(1, (x * dx + y * dy) / segmentLengthSquared));
	const projectionLat = p1[0] + t * dy;
	const projectionLon = p1[1] + t * dx;

	return calculateDistanceOnEarth(point, [projectionLat, projectionLon]);
}

function getNextStepIndex({
	userLocation,
	routePoints,
	closestPointIndex,
}: {
	userLocation: Point;
	routePoints: Point[];
	closestPointIndex: number;
}): number {
	const closestPoint = routePoints[closestPointIndex];
	const next =
		routePoints[Math.min(closestPointIndex + 1, routePoints.length - 1)];
	const prev = routePoints[Math.max(closestPointIndex - 1, 0)];

	if (!next) return closestPointIndex;

	const nextDistance = distanceToSegment(userLocation, [closestPoint, next]);
	const prevDistance = distanceToSegment(userLocation, [closestPoint, prev]);

	return nextDistance < prevDistance
		? closestPointIndex + 1
		: closestPointIndex;
}

export function isOutOfRouteBetweenSteps({
	lastStepIndex,
	routePoints,
	threshold = 50, // 50 meters
	userLocation,
}: {
	userLocation: Point;
	routePoints: Point[];
	lastStepIndex: number;
	threshold: number;
}) {
	// Find the next segment based on user's progress along the route
	const closestPointIndex = findClosestPoint(
		userLocation,
		routePoints,
		lastStepIndex
	);

	const nextStationIndex = getNextStepIndex({
		userLocation,
		routePoints,
		closestPointIndex,
	});
	const prevIndex = Math.max(0, nextStationIndex - 1);
	const segment = [routePoints[prevIndex], routePoints[nextStationIndex]];
	// Calculate distance to this segment
	const distanceToSeg = distanceToSegment(userLocation, segment);
	const distanceToNextPoint = calculateDistanceOnEarth(
		userLocation,
		routePoints[nextStationIndex]
	);
	const isOut = Math.min(distanceToSeg, distanceToNextPoint) > threshold;
	return { isOut, nextStationIndex };
}

export function metersToPixels(
	map: mapboxgl.Map,
	meters: number,
	[lon, lat]: [number, number]
): number {
	const metersPerDegreeLat = 111320; // 1 degree ≈ 111.32 km
	const metersPerDegreeLon = (40075000 * Math.cos((lat * Math.PI) / 180)) / 360;

	const deltaLat = meters / metersPerDegreeLat;
	const deltaLon = meters / metersPerDegreeLon;

	const origin = map.project([lon, lat]);
	const pointNorth = map.project([lon, lat + deltaLat]);
	const pointEast = map.project([lon + deltaLon, lat]);

	const distNorth = Math.hypot(
		pointNorth.x - origin.x,
		pointNorth.y - origin.y
	);
	const distEast = Math.hypot(pointEast.x - origin.x, pointEast.y - origin.y);

	return Math.max(distNorth, distEast);
}
