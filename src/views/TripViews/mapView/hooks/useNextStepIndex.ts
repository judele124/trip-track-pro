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

const RANGE_THRESHOLD = 20; // in meters
const ANGLE_THRESHOLD = 40; // degrees

export default function useNextStepIndex({
	userLocation,
	steps,
}: IUseNextStepIndexProps): IUseNextStepIndexReturn {
	const [nextStepIndex, setNextStepIndex] = useState<number>(1);
	const wasInStepRange = useRef(false);
	const userToStepNextDistance = useRef(0);

	const bearing = useCurrentUserBearing({ userLocation });

	useEffect(() => {
		if (!userLocation || !steps[nextStepIndex]) return;
		const currentStep = steps[nextStepIndex];
		const stepLocation: [number, number] = [
			currentStep.maneuver.location[1],
			currentStep.maneuver.location[0],
		];

		userToStepNextDistance.current =
			calculateDistanceOnEarth(
				[userLocation.lat, userLocation.lon],
				stepLocation
			) * 1000;

		const bearingToCompare = currentStep.maneuver.bearing_after;

		if (userToStepNextDistance.current < RANGE_THRESHOLD) {
			wasInStepRange.current = true;
		} else if (wasInStepRange.current) {
			if (getBearingDiff(bearing, bearingToCompare) < ANGLE_THRESHOLD) {
				setNextStepIndex((prev) => prev + 1);
			} else {
				console.log('⚠️ יצאת מהתחנה אבל לא הלכת בכיוון הנכון!');
			}
			wasInStepRange.current = false;
		}
	}, [userLocation]);

	return { nextStepIndex, userToStepNextDistance };
}

function getBearingDiff(b1: number, b2: number) {
	const diff = Math.abs(b1 - b2);
	return diff > 180 ? 360 - diff : diff;
}
