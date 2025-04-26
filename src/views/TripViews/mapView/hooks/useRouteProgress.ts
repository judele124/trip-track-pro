import {
	Point,
	calculateDistancePointToSegment,
	calculateDistanceOnEarth,
	offsetLocationByMeters,
	getBearing,
} from '@/utils/map.functions';

import { useEffect, useRef, useState } from 'react';

const DISTANCE_THRESHOLD = 10; // meters
const MIN_MOVEMENT = 2; // meters - minimum movement to record

export function useRouteProgress(
	routeCoordinates: Point[],
	userLocation: Point | null,
	isOutOfRoute: boolean = false
) {
	const [walkedPath, setWalkedPath] = useState<Point[]>([]);
	const [lastPoint, setLastPoint] = useState<Point | null>(null);
	const lastUserLocation = useRef<Point | null>(null);

	useEffect(() => {
		if (!userLocation || routeCoordinates.length < 2) return;

		if (isOutOfRoute) {
			console.log('User went out of route, resetting path');
			setWalkedPath([]);
			setLastPoint(null);
			lastUserLocation.current = null;
			return;
		}

		// Skip if we haven't moved enough
		if (
			lastUserLocation.current &&
			calculateDistanceOnEarth(lastUserLocation.current, userLocation) <
				MIN_MOVEMENT
		) {
			return;
		}

		let minDistance = Infinity;
		let closestPoint: Point | null = null;

		for (let i = 0; i < routeCoordinates.length - 1; i++) {
			const segment: [Point, Point] = [
				routeCoordinates[i],
				routeCoordinates[i + 1],
			];
			const distance = calculateDistancePointToSegment(userLocation, segment);

			if (distance < minDistance) {
				minDistance = distance;
				closestPoint = routeCoordinates[i];
			}
		}

		if (!closestPoint) return;

		if (!lastPoint) {
			setLastPoint(closestPoint);
			setWalkedPath([closestPoint]);
			lastUserLocation.current = userLocation;
			return;
		}

		const distanceFromClosest = calculateDistanceOnEarth(
			userLocation,
			closestPoint
		);

		if (distanceFromClosest >= DISTANCE_THRESHOLD) {
			const newPoints = interpolatePoints(lastPoint, userLocation);
			setWalkedPath((prev) => [...prev, ...newPoints.slice(1)]);
			setLastPoint(newPoints[newPoints.length - 1]);
			lastUserLocation.current = userLocation;
		}
	}, [userLocation, routeCoordinates, isOutOfRoute]);

	return {
		walkedPath,
		snappedLocation: lastPoint,
	};
}

function interpolatePoints(start: Point, end: Point): Point[] {
	const distance = calculateDistanceOnEarth(start, end);
	if (distance <= DISTANCE_THRESHOLD) {
		return [start, end];
	}

	const numPoints = Math.floor(distance / DISTANCE_THRESHOLD);
	const bearing = getBearing(start, end);
	const points: Point[] = [start];

	for (let i = 1; i < numPoints; i++) {
		const point = offsetLocationByMeters(
			start,
			i * DISTANCE_THRESHOLD,
			bearing
		);
		points.push(point);
	}
	points.push(end);

	return points;
}
