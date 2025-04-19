import Map from './Map';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/StopMarker';
import GeneralMarker from './components/GeneralMarker';
import UserMarker from './components/UserMarker';
import { useMapboxDirectionRoute } from './hooks/useMapboxDirectionRoute';
import DirectionComponent from './components/DirectionComponent';
import MapRoute from './components/MapRoute';
import useFakeUserLocation from './tests/useFakeUserLocation';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import { useAuthContext } from '@/contexts/AuthContext';

export default function MapView() {
	const { user } = useAuthContext();
	const { trip, setTripRoute, tripRoute } = useTripContext();
	useTripSocket();

	const { userCurrentLocation, initialUserLocation } = useCurrentUserLocation({
		onLocationUpdate: (location) => {
			console.log('Location from useCurrentUserLocation', location);
		},
	});

	const tripStopsPoints = useMemo(
		() => trip?.stops.map((stop) => stop.location) || [],
		[trip]
	);

	const { routeData: tripStopsRouteData } = useMapboxDirectionRoute({
		points: tripStopsPoints,
		runGetDirectionsRoute: !tripRoute,
	});

	const userAndFirstStopPoints = useMemo(
		() =>
			initialUserLocation ? [initialUserLocation, tripStopsPoints[0]] : [],
		[initialUserLocation]
	);

	const { routeData: userToFirstStopRouteData } = useMapboxDirectionRoute({
		points: userAndFirstStopPoints,
	});

	const fakePoints = useMemo(() => {
		if (!tripStopsRouteData) {
			return [];
		}
		return tripStopsRouteData.routes[0].geometry.coordinates.map((coord) => ({
			lat: coord[1],
			lon: coord[0],
		}));
	}, [tripStopsRouteData]);

	const fakeLocation = useFakeUserLocation({
		points: [
			...fakePoints.slice(0, fakePoints.length / 2),
			...fakePoints.slice(0, fakePoints.length / 2).reverse(),
		],
		speed: 40,
		updateIntervalMs: 200,
	});

	useEffect(() => {
		if (!tripStopsRouteData) return;
		setTripRoute(tripStopsRouteData);
	}, [tripStopsRouteData]);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map>
				{fakeLocation && user && (
					<UserMarker location={fakeLocation} user={user} />
				)}

				{userCurrentLocation && user && (
					<UserMarker location={userCurrentLocation} user={user} />
				)}
				{tripRoute && (
					<MapRoute
						route={tripRoute}
						options={{
							lineColor: '#3887be',
							lineWidth: 5,
							lineOpacity: 0.7,
						}}
					/>
				)}
				{userToFirstStopRouteData && (
					<MapRoute
						route={userToFirstStopRouteData}
						options={{
							lineColor: '#FF0000',
							lineWidth: 5,
							lineOpacity: 0.7,
						}}
					/>
				)}
				{trip?.stops.map((stop, i) => {
					return (
						<GeneralMarker
							key={`${stop.location.lat}-${stop.location.lon}-${i}`}
							location={stop.location}
						>
							<StopMarker stop={stop} />
						</GeneralMarker>
					);
				})}

				{tripRoute?.routes[0].legs[0].steps && (
					<DirectionComponent
						geometryPoints={tripRoute.routes[0].geometry.coordinates}
						userLocation={fakeLocation}
						steps={tripRoute.routes[0].legs[0].steps}
					/>
				)}
			</Map>
		</div>
	);
}
