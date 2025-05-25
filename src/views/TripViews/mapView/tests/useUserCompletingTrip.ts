import { Trip } from '@/types/trip';
import useFakeUserLocation from './useFakeUserLocation';
import { useMapboxDirectionRoute } from '../hooks/useMapboxDirectionRoute';
import { useMemo } from 'react';

interface IUseUserCompletingTripProps {
	isAtTripRoute: boolean;
	trip: Trip | null;
	initialUserLocation: { lat: number; lon: number } | null;
}

export default function useUserCompletingTrip({
	trip,
	initialUserLocation,
	isAtTripRoute,
}: IUseUserCompletingTripProps) {
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
		updateIntervalMs: 100,
	});

	return {
		fakeUserLocation,
	};
}
