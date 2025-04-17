import {
	calculateDistanceOnEarth,
	getBearing,
	getBearingDiff,
	isOutOfRouteBetweenSteps,
} from '@/utils/map.functions';
import { useEffect, useRef, useState } from 'react';
import useCurrentUserBearing from './useCurrentUserBearing';

interface IUseCurrentUserOutOfTripRouteProps {
	geometryPoints: number[][];
	userLocation: { lon: number; lat: number } | null;
}

export const RANGE_GEOMETRY_POINT_THRESHOLD = 2; // in meters
export const ANGLE_GEOMETRY_POINT_THRESHOLD = 10; // degrees

export default function useCurrentUserOutOfTripRoute({
	geometryPoints,
	userLocation,
}: IUseCurrentUserOutOfTripRouteProps): boolean {
	const [isOutOfRoute, setIsOutOfRoute] = useState(false);
	const nextGeometryPoint = useRef<number>(1);
	const wasInStepRange = useRef<boolean[]>([]);
	const userBearing = useCurrentUserBearing({ userLocation });

	useEffect(() => {
		if (!userLocation) return;
		const { lon, lat } = userLocation;

		const userDistanceToPoint = calculateDistanceOnEarth(
			[lon, lat],
			geometryPoints[nextGeometryPoint.current]
		);

		if (userDistanceToPoint < RANGE_GEOMETRY_POINT_THRESHOLD) {
			wasInStepRange.current[nextGeometryPoint.current] = true;
		}

		const bearingToCompare = getBearing(
			geometryPoints[nextGeometryPoint.current],
			geometryPoints[nextGeometryPoint.current + 1]
		);

		if (wasInStepRange.current[nextGeometryPoint.current]) {
			const userDistanceToNextPoint = calculateDistanceOnEarth(
				[lon, lat],
				geometryPoints[nextGeometryPoint.current + 1]
			);
			if (userDistanceToNextPoint < RANGE_GEOMETRY_POINT_THRESHOLD) {
				wasInStepRange.current[nextGeometryPoint.current + 1] = true;
				nextGeometryPoint.current = nextGeometryPoint.current + 1;
			} else if (
				getBearingDiff(userBearing, bearingToCompare) <
				ANGLE_GEOMETRY_POINT_THRESHOLD
			) {
				nextGeometryPoint.current = nextGeometryPoint.current + 1;
			}
		}

		const isOut = isOutOfRouteBetweenSteps({
			userLocation: [lon, lat],
			routePoints: geometryPoints,
			nextPointIndex: nextGeometryPoint.current,
			threshold: 20,
		});

		// nextGeometryPoint.current = isOut.nextPointIndex;

		setIsOutOfRoute(isOut);
	}, [userLocation]);
	return isOutOfRoute;
}
