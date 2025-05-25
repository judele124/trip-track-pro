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
import { Types } from 'trip-track-package';
import useFakeUserLocation from './tests/useFakeUserLocation';
import useUserCompletingTrip from './tests/useUserCompletingTrip';

const INACTIVE_ROUTE_OPACITY = 0.5;
const ROUTE_OPACITY = 1;

const INACTIVE_ROUTE_COLOR = '#3e5c76';
const ACTIVE_ROUTE_COLOR = '#1b4965';
const ROUTE_FILL_COLOR = '#5fa8d3';

const ROUTE_WIDTH = 6;
const ROUTE_FILL_WIDTH = 2;

export default function MapView() {
	const { user } = useAuthContext();
	const { trip } = useTripContext();
	const { usersLocations, socket, currentExpIndex } = useTripSocket();

	const { userCurrentLocation, initialUserLocation } = useCurrentUserLocation({
		onLocationUpdate: (location) => {
			if (!trip || !socket) return;
			socket.emit('updateLocation', trip._id, location);
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

	const { fakeUserLocation } = useUserCompletingTrip({
		trip,
		initialUserLocation,
		isAtTripRoute,
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

	return (
		<div className='page-colors mx-auto h-full'>
			<Map>
				{/* loading location */}
				{!initialUserLocation && <LoadingLocation />}

				{fakeUserLocation && user && (
					<CurrentUserMarker location={fakeUserLocation} user={user} />
				)}

				{usersLocations.map(({ id, location }) => (
					<OtherUserMarker location={location} key={id} />
				))}

				{trip && fakeUserLocation && (
					<>
						{isAtTripRoute ? (
							<TripStopsMarkers
								currentExpIndex={currentExpIndex}
								stops={trip.stops}
							/>
						) : (
							<TripStartLocationMarker location={trip.stops[0].location} />
						)}

						<RouteAndNavigation
							routeId='trip-route'
							originalPoints={memoizedTripPoints}
							routeOptions={{
								lineColor: isAtTripRoute
									? ACTIVE_ROUTE_COLOR
									: INACTIVE_ROUTE_COLOR,
								lineWidth: ROUTE_WIDTH,
								lineOpacity: isAtTripRoute
									? ROUTE_OPACITY
									: INACTIVE_ROUTE_OPACITY,
							}}
							fillRouteOption={{
								lineColor: ROUTE_FILL_COLOR,
								lineWidth: ROUTE_FILL_WIDTH,
								lineOpacity: ROUTE_OPACITY,
							}}
							userLocation={fakeUserLocation}
							active={isAtTripRoute}
						/>

						{!isAtTripRoute && (
							<RouteAndNavigation
								active={true}
								routeId='user-to-trip-route'
								originalPoints={memoizedUserToTripPoints}
								routeOptions={{
									lineColor: ACTIVE_ROUTE_COLOR,
									lineWidth: ROUTE_WIDTH,
									lineOpacity: ROUTE_OPACITY,
								}}
								fillRouteOption={{
									lineColor: ROUTE_FILL_COLOR,
									lineWidth: ROUTE_FILL_WIDTH,
									lineOpacity: ROUTE_OPACITY,
								}}
								userLocation={fakeUserLocation}
							/>
						)}
					</>
				)}
			</Map>
		</div>
	);
}

function LoadingLocation() {
	return (
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
	);
}

function TripStopsMarkers({
	stops,
	currentExpIndex,
}: {
	stops: Types['Trip']['Stop']['Model'][];
	currentExpIndex: number;
}) {
	return stops.map((stop, i) => (
		<GeneralMarker
			key={`${stop.location.lat}-${stop.location.lon}-${i}`}
			location={stop.location}
		>
			<StopMarker
				disableExperience={i !== currentExpIndex}
				stop={stop}
				index={i}
			/>
		</GeneralMarker>
	));
}

function TripStartLocationMarker({
	location,
}: {
	location: {
		lat: number;
		lon: number;
	};
}) {
	return (
		<GeneralMarker location={location}>
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
	);
}
