import { MapBoxDirectionsResponse } from '@/types/map';
import {
	Map,
	LayerSpecification,
	CircleLayerSpecification,
	GeoJSONSourceSpecification,
} from 'mapbox-gl';

export type Point = [number, number] | number[];

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
	coordinates: Point,
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
	[lon1, lat1]: Point,
	[lon2, lat2]: Point
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

/**
 * Calculates the shortest distance from a point (lon, lat) to a segment (two lon-lat points),
 * and returns the distance in meters using Haversine formula.
 */
export function calculateDistancePointToSegment(
	point: Point,
	segment: [Point, Point]
): number {
	const [px, py] = point;
	const [[x1, y1], [x2, y2]] = segment;

	const dx = x2 - x1;
	const dy = y2 - y1;

	const lengthSquared = dx * dx + dy * dy;

	// Segment is just a single point
	if (lengthSquared === 0) {
		return calculateDistanceOnEarth(point, segment[0]);
	}

	// Project point onto the segment (in lon-lat coordinate space)
	let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
	t = Math.max(0, Math.min(1, t));

	// Find the closest point on the segment
	const closest: Point = [x1 + t * dx, y1 + t * dy];

	// Use your haversine-based function to get distance in meters
	return calculateDistanceOnEarth(point, closest);
}

export function getClosestPointWithMinDistance(
	routePoints: Point[],
	currentIndex: number,
	minDistance: number,
	before?: boolean
) {
	if (before) {
		while (
			currentIndex > 0 &&
			calculateDistanceOnEarth(
				routePoints[currentIndex],
				routePoints[currentIndex - 1]
			) < minDistance
		) {
			currentIndex--;
		}
		return currentIndex;
	}

	while (
		currentIndex + 1 < routePoints.length &&
		calculateDistanceOnEarth(
			routePoints[currentIndex],
			routePoints[currentIndex + 1]
		) < minDistance
	) {
		currentIndex++;
	}

	return currentIndex;
}

type isOutOfRouteBetweenStepsProps = {
	userLocation: Point;
	routePoints: Point[];
	nextPointIndex: number;
	threshold: number;
};

export function isOutOfRouteBetweenSteps({
	nextPointIndex,
	routePoints,
	threshold = 50, // 50 meters
	userLocation,
}: isOutOfRouteBetweenStepsProps) {
	let prevIndex = nextPointIndex - 1;

	// if point is too close to eachother
	if (
		calculateDistanceOnEarth(
			routePoints[prevIndex],
			routePoints[nextPointIndex]
		) < 5
	) {
		prevIndex--;
	}

	if (prevIndex < 0) {
		prevIndex = 0;
		nextPointIndex++;
	}

	const segment: [Point, Point] = [
		routePoints[prevIndex],
		routePoints[nextPointIndex],
	];

	// Calculate distance to this segment
	const distanceToSeg = calculateDistancePointToSegment(userLocation, segment);

	const isOut = distanceToSeg > threshold;

	return { prevIndex, nextPointIndex, isOut };
}

export function metersToPixels(
	map: mapboxgl.Map,
	meters: number,
	[lon, lat]: Point
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

/**
 * Returns a new [lon, lat] coordinate offset by a given distance and direction.
 *
 * @param lat - Starting latitude
 * @param lon - Starting longitude
 * @param distanceMeters - Distance in meters to move
 * @param directionDegrees - Direction to move, in degrees (0 = north, 90 = east)
 * @returns [lon, lat] - New coordinate
 */
export function offsetLocationByMeters(
	[lon, lat]: Point,
	distanceMeters: number,
	directionDegrees: number
): Point {
	const R = 6378137; // Earth's radius in meters (WGS-84)
	const delta = distanceMeters / R; // angular distance in radians
	const theta = (directionDegrees * Math.PI) / 180; // convert to radians

	const latRad = (lat * Math.PI) / 180;
	const lonRad = (lon * Math.PI) / 180;

	const newLatRad = Math.asin(
		Math.sin(latRad) * Math.cos(delta) +
			Math.cos(latRad) * Math.sin(delta) * Math.cos(theta)
	);

	const newLonRad =
		lonRad +
		Math.atan2(
			Math.sin(theta) * Math.sin(delta) * Math.cos(latRad),
			Math.cos(delta) - Math.sin(latRad) * Math.sin(newLatRad)
		);

	const newLat = (newLatRad * 180) / Math.PI;
	const newLon = (newLonRad * 180) / Math.PI;

	return [newLon, newLat];
}

export function getBearing([lon1, lat1]: Point, [lon2, lat2]: Point): number {
	const toRadians = (deg: number) => (deg * Math.PI) / 180;
	const toDegrees = (rad: number) => (rad * 180) / Math.PI;

	const φ1 = toRadians(lat1);
	const φ2 = toRadians(lat2);
	const Δλ = toRadians(lon2 - lon1);

	const y = Math.sin(Δλ) * Math.cos(φ2);
	const x =
		Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

	const θ = Math.atan2(y, x);
	const bearing = (toDegrees(θ) + 360) % 360;

	return bearing;
}

export function getBearingDiff(b1: number, b2: number) {
	const diff = Math.abs(b1 - b2);
	return diff > 180 ? 360 - diff : diff;
}
