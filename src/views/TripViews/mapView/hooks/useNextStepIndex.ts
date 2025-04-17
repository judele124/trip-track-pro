import { DirectionStep } from '@/types/map';
import { calculateDistanceOnEarth } from '@/utils/map.functions';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useCurrentUserBearing from './useCurrentUserBearing';

interface IUseNextStepIndexProps {
	userLocation: { lon: number; lat: number } | null;
	steps: DirectionStep[];
}

interface IUseNextStepIndexReturn {
	nextStepIndex: number;
	userToStepNextDistance: MutableRefObject<number>;
}

export const RANGE_THRESHOLD = 5; // in meters
export const ANGLE_THRESHOLD = 20; // degrees

export default function useNextStepIndex({
	userLocation,
	steps,
}: IUseNextStepIndexProps): IUseNextStepIndexReturn {
	const [nextStepIndex, setNextStepIndex] = useState<number>(1);
	const wasInStepRange = useRef<boolean[]>([]);
	const userToStepNextDistance = useRef(0);

	const bearing = useCurrentUserBearing({ userLocation });

	useEffect(() => {
		if (!userLocation || !steps[nextStepIndex]) return;
		const { lat, lon } = userLocation;

		const currentStep = steps[nextStepIndex];

		userToStepNextDistance.current = calculateDistanceOnEarth(
			[lon, lat],
			currentStep.maneuver.location
		);

		if (userToStepNextDistance.current < RANGE_THRESHOLD) {
			wasInStepRange.current[nextStepIndex] = true;
		}

		const bearingToCompare = currentStep.maneuver.bearing_after;

		if (wasInStepRange.current[nextStepIndex]) {
			if (getBearingDiff(bearing, bearingToCompare) < ANGLE_THRESHOLD) {
				setNextStepIndex((prev) => prev + 1);
			}
		}
	}, [userLocation]);

	return { nextStepIndex, userToStepNextDistance };
}

function getBearingDiff(b1: number, b2: number) {
	const diff = Math.abs(b1 - b2);
	return diff > 180 ? 360 - diff : diff;
}
