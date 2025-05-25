import { Trip } from '@/types/trip';
import useFakeUserLocation from './useFakeUserLocation';
import { useMapboxDirectionRoute } from '../hooks/useMapboxDirectionRoute';
import { useEffect, useMemo } from 'react';
import { calculateDistanceOnEarth } from '@/utils/map.functions';
import useToggle from '@/hooks/useToggle';
import { RANGE_STEP_THRESHOLD } from '../hooks/useNextStepIndex';

interface IUseUserCompletingTripProps {
	trip: Trip | null;
	initialUserLocation: { lat: number; lon: number } | null;
}

export default function useUserCompletingTrip({
	trip,
	initialUserLocation,
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
		speed: 100,
		updateIntervalMs: 500,
	});

	useEffect(() => {
		if (!trip || !fakeUserLocation || !trip.stops[0].location) return;
		const distance = calculateDistanceOnEarth(
			[fakeUserLocation.lon, fakeUserLocation.lat],
			[trip.stops[0].location.lon, trip.stops[0].location.lat]
		);

		if (distance < RANGE_STEP_THRESHOLD) {
			setIsAtTripRoute(true);
		}
	}, [fakeUserLocation, trip?.stops]);

	return {
		fakeUserLocation,
		isAtTripRoute,
	};
}
