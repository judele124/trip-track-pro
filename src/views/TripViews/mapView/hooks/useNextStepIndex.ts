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
export const ANGLE_THRESHOLD = 40; // degrees

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
		const calculateDistanceFromUserToStepInMeters = (
			step: DirectionStep,
			userLocation: { lat: number; lon: number }
		) => {
			const stepLocation: [number, number] = [
				step.maneuver.location[1],
				step.maneuver.location[0],
			];

			return calculateDistanceOnEarth(
				[userLocation.lat, userLocation.lon],
				stepLocation
			);
		};

		userToStepNextDistance.current = calculateDistanceFromUserToStepInMeters(
			steps[nextStepIndex],
			userLocation
		);

		[nextStepIndex, nextStepIndex + 1].forEach((i) => {
			const step = steps[i];
			if (!step) return;

			const distance = calculateDistanceFromUserToStepInMeters(
				step,
				userLocation
			);

			// console.log('user distance to step', i, Math.floor(distance), 'meters');

			const bearingToCompare = step.maneuver.bearing_after;

			if (distance < RANGE_THRESHOLD) {
				wasInStepRange.current[i] = true;
				// console.log('user in step range', nextStepIndex);
			} else if (wasInStepRange.current[i]) {
				if (getBearingDiff(bearing, bearingToCompare) < ANGLE_THRESHOLD) {
					if (i === nextStepIndex) {
						// console.log('user is heading toward step', nextStepIndex + 1);
						setNextStepIndex((prev) => prev + 1);
					}
				} else {
					// console.log('⚠️ יצאת אבל לא הלכת בכיוון הנכון!');
				}
				wasInStepRange.current[i] = false;
			}
		});
	}, [userLocation]);

	return { nextStepIndex, userToStepNextDistance };
}

function getBearingDiff(b1: number, b2: number) {
	const diff = Math.abs(b1 - b2);
	return diff > 180 ? 360 - diff : diff;
}
