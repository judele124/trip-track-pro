import Map from './Map';
import { useEffect, useMemo } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/Markers/StopMarker';
import GeneralMarker from './components/Markers/GeneralMarker';
import CurrentUserMarker from './components/Markers/CurrentUserMarker';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateDistanceOnEarth } from '@/utils/map.functions';
import useToggle from '@/hooks/useToggle';
import { RANGE_STEP_THRESHOLD } from './hooks/useNextStepIndex';
import RouteAndNavigation from './components/RoutesAndNavigation/RouteAndNavigation';
import OtherUserMarker from './components/Markers/OtherUserMarker';
import Icon from '@/components/icons/Icon';

export default function MapView() {
	const { user } = useAuthContext();
	const { trip } = useTripContext();
	const { usersLocations, socket } = useTripSocket();

	const { userCurrentLocation, initialUserLocation } = useCurrentUserLocation({
		onLocationUpdate: (location) => {
			if (!trip || !socket) return;
			socket.emit('updateLocation', trip._id.toString(), location);
		},
	});

	const memoizedTripPoints = useMemo(
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
		<div className='page-colors mx-auto h-full'>
			<Map>
				{/* loading location */}
				{!userCurrentLocation && (
					<div
						className={`flex items-center justify-center gap-2 bg-white p-2 shadow-lg dark:bg-secondary`}
					>
						<i>
							<Icon className='fill-primary dark:fill-white' name='spinner' />
						</i>
						<span className='text-primary dark:text-white'>
							Getting your location
						</span>
					</div>
				)}

				{userCurrentLocation && user && (
					<CurrentUserMarker location={userCurrentLocation} user={user} />
				)}

				{usersLocations.map(({ id, location }) => (
					<OtherUserMarker location={location} key={id} />
				))}

				{/* display stops only when at trip route */}
				{isAtTripRoute &&
					trip?.stops.map((stop, i) => {
						return (
							<GeneralMarker
								key={`${stop.location.lat}-${stop.location.lon}-${i}`}
								location={stop.location}
							>
								<StopMarker stop={stop} />
							</GeneralMarker>
						);
					})}

				<RouteAndNavigation
					originalPoints={
						!isAtTripRoute ? memoizedUserToTripPoints : memoizedTripPoints
					}
					routeOptions={{
						lineColor: '#7dafc6',
						lineWidth: 6,
						lineOpacity: 0.7,
					}}
					fillRouteOption={{
						lineColor: '#02a9fc',
						lineWidth: 5,
						lineOpacity: 0.7,
					}}
					userLocation={userCurrentLocation}
				/>

				{/* trip start point */}
				{!isAtTripRoute && trip && (
					<GeneralMarker location={trip.stops[0].location}>
						<div
							className={`relative flex max-w-60 -translate-y-12 items-center justify-between gap-4 rounded-2xl bg-light p-3 text-dark dark:bg-dark dark:text-light`}
						>
							<p className='text-sm font-semibold'>Trip start point</p>

							<svg
								className='absolute left-1/2 top-full size-5 -translate-x-1/2 fill-light dark:fill-dark'
								width='51'
								height='60'
								viewBox='0 0 51 60'
							>
								<path d='M50.75 0H0.75L27.2806 62L50.75 0Z' />
							</svg>
						</div>
					</GeneralMarker>
				)}
			</Map>
		</div>
	);
}
