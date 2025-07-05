import {
	calculateDistanceOnEarth,
	getBearing,
	getBearingDiff,
} from '@/utils/map.functions';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useCurrentUserBearing from './useCurrentUserBearing';

interface IUseNextPointIndexProps {
	userLocation: { lon: number; lat: number } | null;
	steps: (number[] | [number, number])[];
	active?: boolean;
}

interface IUseNextPointIndexReturn {
	nextPointIndex: number;
	userToPointNextDistance: MutableRefObject<number>;
}

export const RANGE_STEP_THRESHOLD = 5; // in meters
export const ANGLE_STEP_THRESHOLD = 20; // degrees

export default function useNextPointIndex({
	userLocation,
	steps,
	active,
}: IUseNextPointIndexProps): IUseNextPointIndexReturn {
	const [nextPointIndex, setNextPointIndex] = useState<number>(1);
	const wasInPointRange = useRef<boolean[]>([]);
	const userToPointNextDistance = useRef(0);

	const bearing = useCurrentUserBearing({ userLocation });

	useEffect(() => {
		if (!active || !userLocation || !steps?.[nextPointIndex]) return;
		const { lat, lon } = userLocation;

		const currentPoint = steps[nextPointIndex];

		userToPointNextDistance.current = calculateDistanceOnEarth(
			[lon, lat],
			currentPoint
		);

		if (userToPointNextDistance.current < RANGE_STEP_THRESHOLD) {
			wasInPointRange.current[nextPointIndex] = true;
		}

		const bearingToCompare = getBearing([lon, lat], currentPoint);

		if (wasInPointRange.current[nextPointIndex] && steps[nextPointIndex + 1]) {
			const userDistanceToNextPoint = calculateDistanceOnEarth(
				[lon, lat],
				steps[nextPointIndex + 1]
			);
			if (userDistanceToNextPoint < RANGE_STEP_THRESHOLD) {
				wasInPointRange.current[nextPointIndex + 1] = true;
				setNextPointIndex((prev) => prev + 1);
			} else if (
				getBearingDiff(bearing, bearingToCompare) < ANGLE_STEP_THRESHOLD
			) {
				setNextPointIndex((prev) => prev + 1);
			}
		}
	}, [userLocation, active, steps]);

	return { nextPointIndex, userToPointNextDistance };
}
