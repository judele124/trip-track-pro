import {
	calculateShortestDistancePointToSegment,
	findClosestSegment,
	Point,
} from '@/utils/map.functions';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface IUseCurrentUserOutOfTripRouteProps {
	geometryPoints: Point[];
	userLocation: { lon: number; lat: number } | null;
}
interface IUseCurrentUserOutOfTripRouteReturn {
	isOutOfRoute: boolean;
}

const RANGE_FOR_USER_OUT_OF_RANGE = 20; // in meters
const SEGMENTS_TO_CHECK = 5; // Number of segments to check in each direction

export default function useCurrentUserOutOfTripRoute({
	geometryPoints,
	userLocation,
}: IUseCurrentUserOutOfTripRouteProps): IUseCurrentUserOutOfTripRouteReturn {
	const [isOutOfRoute, setIsOutOfRoute] = useState(false);
	const segmantPointsIndexs = useRef<[number, number]>([0, 1]);

	useEffect(() => {
		if (!userLocation || geometryPoints.length < 2) {
			return;
		}

		const { lon, lat } = userLocation;
		let [pointIndexBefore, pointIndexAfter] = segmantPointsIndexs.current;

		pointIndexBefore = checkBoundary(
			pointIndexBefore,
			geometryPoints.length - 2,
			0
		);
		pointIndexAfter = checkBoundary(
			pointIndexAfter,
			geometryPoints.length - 1,
			1
		);

		const [closestBeforeIndex, closestAfterIndex] = findClosestSegment(
			geometryPoints,
			userLocation,
			pointIndexBefore,
			pointIndexAfter,
			SEGMENTS_TO_CHECK
		);

		segmantPointsIndexs.current = [closestBeforeIndex, closestAfterIndex];

		console.log('segmantPointsIndexs', segmantPointsIndexs.current);

		const distance = calculateShortestDistancePointToSegment(
			[lon, lat],
			[geometryPoints[closestBeforeIndex], geometryPoints[closestAfterIndex]]
		);

		setIsOutOfRoute(distance > RANGE_FOR_USER_OUT_OF_RANGE);
	}, [geometryPoints, userLocation]);

	return { isOutOfRoute };
}

const checkBoundary = (index: number, max: number, min: number): number => {
	if (index < min) {
		return min;
	}
	if (index > max) {
		return max;
	}
	return index;
};
