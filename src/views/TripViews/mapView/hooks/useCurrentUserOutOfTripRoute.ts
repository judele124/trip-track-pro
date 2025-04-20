import {
	calculateDistanceOnEarth,
	calculateDistancePointToSegment,
	getBearing,
	getBearingDiff,
	getClosestPointWithMinDistance,
} from '@/utils/map.functions';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useCurrentUserBearing from './useCurrentUserBearing';

interface IUseCurrentUserOutOfTripRouteProps {
	geometryPoints: number[][];
	userLocation: { lon: number; lat: number } | null;
}

export const RANGE_FOR_USER_OUT_OF_RANGE = 20; // in meters
export const RANGE_FOR_USER_IN_POINT = 10; // in meters
export const RANGE_BETWEEN_GEOMETRY_POINT_FOR_SKIPPING_CLOSE_POINT = 10; // in meters
export const ANGLE_GEOMETRY_POINT_THRESHOLD = 10; // degrees

export default function useCurrentUserOutOfTripRoute({
	geometryPoints,
	userLocation,
}: IUseCurrentUserOutOfTripRouteProps): {
	isOutOfRoute: boolean;
	segmantPointsIndexs: MutableRefObject<[number, number]>;
} {
	const [isOutOfRoute, setIsOutOfRoute] = useState(false);
	const segmantPointsIndexs = useRef<[number, number]>([0, 1]);
	const wasInStepRange = useRef<boolean[]>([true]);
	const userBearing = useCurrentUserBearing({ userLocation });

	useEffect(() => {
		if (!userLocation || !geometryPoints.length) return;

		const { lon, lat } = userLocation;
		let [pointIndexBefore, pointIndexAfter] = segmantPointsIndexs.current;

		// Check if user is out of route
		const distanceToSegment = calculateDistancePointToSegment(
			[lon, lat],
			[geometryPoints[pointIndexBefore], geometryPoints[pointIndexAfter]]
		);

		if (distanceToSegment > RANGE_FOR_USER_OUT_OF_RANGE) {
			setIsOutOfRoute(true);
		}

		const forwardBearing = getBearing(
			geometryPoints[pointIndexBefore],
			geometryPoints[pointIndexAfter]
		);

		const isMovingForward =
			getBearingDiff(userBearing, forwardBearing) <
			ANGLE_GEOMETRY_POINT_THRESHOLD;

		if (isMovingForward) {
			const distanceFromPointAfter = calculateDistanceOnEarth(
				[lon, lat],
				geometryPoints[pointIndexAfter]
			);
			if (distanceFromPointAfter < RANGE_FOR_USER_IN_POINT) {
				wasInStepRange.current[pointIndexAfter] = true;
			} else if (wasInStepRange.current[pointIndexAfter]) {
				const nextPointIndexAfter = getClosestPointWithMinDistance(
					geometryPoints,
					pointIndexAfter + 1,
					RANGE_BETWEEN_GEOMETRY_POINT_FOR_SKIPPING_CLOSE_POINT
				);

				pointIndexBefore = pointIndexAfter;
				pointIndexAfter = nextPointIndexAfter;
				wasInStepRange.current[pointIndexBefore] = false;
			}
		}
		segmantPointsIndexs.current = [pointIndexBefore, pointIndexAfter];
	}, [userLocation]);
	return { isOutOfRoute, segmantPointsIndexs };
}
