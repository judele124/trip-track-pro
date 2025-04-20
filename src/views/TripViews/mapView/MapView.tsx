import Map from './Map';
import { useEffect, useMemo } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import UserMarker from './components/UserMarker';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateDistanceOnEarth } from '@/utils/map.functions';
import useToggle from '@/hooks/useToggle';
import { RANGE_STEP_THRESHOLD } from './hooks/useNextStepIndex';
import RouteAndNavigation from './components/RouteAndNavigation';

export default function MapView() {
	const { user } = useAuthContext();
	const { trip } = useTripContext();
	useTripSocket();
	const { userCurrentLocation, initialUserLocation } = useCurrentUserLocation();

	const memoizedTripPoints = useMemo(
		() => trip?.stops.map((stop) => stop.location) || [],
		[trip]
	);

	const memoizedUserToTripPoints = useMemo(
		() =>
			trip && initialUserLocation
				? [initialUserLocation, trip.stops[0].location]
				: [],
		[initialUserLocation, trip]
	);

	const { isOpen: isAtTripRoute, setIsOpen: setIsAtTripRoute } = useToggle();

	useEffect(() => {
		if (!trip || !userCurrentLocation || !trip.stops[0].location) return;
		const distance = calculateDistanceOnEarth(
			[userCurrentLocation.lon, userCurrentLocation.lat],
			[trip.stops[0].location.lon, trip.stops[0].location.lat]
		);

		if (distance < RANGE_STEP_THRESHOLD) {
			setIsAtTripRoute(true);
		}
	}, [userCurrentLocation, trip?.stops]);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map>
				{userCurrentLocation && user && (
					<UserMarker location={userCurrentLocation} user={user} />
				)}

				<RouteAndNavigation
					points={memoizedTripPoints}
					routeOptions={{
						lineColor: '#02a9fc',
						lineWidth: 5,
						lineOpacity: 0.7,
					}}
					userLocation={userCurrentLocation}
				/>

				<RouteAndNavigation
					points={memoizedUserToTripPoints}
					routeOptions={{
						lineColor: '#777777',
						lineWidth: 5,
						lineOpacity: 0.7,
					}}
					userLocation={userCurrentLocation}
				/>
			</Map>
		</div>
	);
}
