import { Trip } from '@/types/trip';
import useFakeUserLocation from './useFakeUserLocation';
import { useMapboxDirectionRoute } from '../hooks/useMapboxDirectionRoute';
import { useEffect, useMemo } from 'react';
import { calculateDistanceOnEarth } from '@/utils/map.functions';
import useToggle from '@/hooks/useToggle';
import { RANGE_STEP_THRESHOLD } from '../hooks/useNextStepIndex';

type Point = {
	lon: number;
	lat: number;
};

interface IUseUserCompletingTripProps {
	trip: Trip | null;
	initialUserLocation: { lat: number; lon: number } | null;
	onLocationUpdate?: (location: Point) => void;
}

export default function useUserCompletingTrip({
	trip,
	initialUserLocation,
	onLocationUpdate,
}: IUseUserCompletingTripProps) {
	const { isOpen: isAtTripRoute, setIsOpen: setIsAtTripRoute } = useToggle();

	const memoizedPoints = useMemo(
		() => trip?.stops.map((stop) => stop.location) || [],
		[trip]
	);

	const memoizedUserToTripPoints = useMemo(
		() =>
			trip && initialUserLocation
				? [initialUserLocation, trip.stops[0].location]
				: [],
		[trip, initialUserLocation]
	);

	const { routeData } = useMapboxDirectionRoute({
		points: isAtTripRoute ? memoizedPoints : memoizedUserToTripPoints,
	});

	const fakeUserLocation = useFakeUserLocation({
		points:
			routeData?.routes[0].geometry.coordinates.map((point) => ({
				lat: point[1],
				lon: point[0],
			})) || [],
		speed: 10,
		updateIntervalMs: 500,
		onLocationUpdate,
	});

	useEffect(() => {
		if (!trip || !fakeUserLocation || !trip.stops[0].location) return;

		const steps = routeData?.routes[0].legs[0].steps;
		const lastStep = steps?.[steps.length - 1];

		if (!lastStep) return;

		const distance = calculateDistanceOnEarth(
			[fakeUserLocation.lon, fakeUserLocation.lat],
			lastStep.maneuver.location
		);

		if (distance < RANGE_STEP_THRESHOLD) {
			setIsAtTripRoute(true);
		}
	}, [fakeUserLocation, trip?.stops, routeData]);

	return {
		fakeUserLocation,
		isAtTripRoute,
	};
}
