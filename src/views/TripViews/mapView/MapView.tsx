import Map from './Map';
import { useEffect, useMemo } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/StopMarker';
import GeneralMarker from './components/GeneralMarker';
import UserMarker from './components/UserMarker';
import { useMapboxDirectionRoute } from './hooks/useMapboxDirectionRoute';
import DirectionComponent from './components/DirectionComponent';
import MapRoute from './components/MapRoute';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import OtherUserMarker from './components/OtherUserMarker';

export default function MapView() {
	const { trip, setTripRoute, tripRoute } = useTripContext();
	const { usersLocations, socket } = useTripSocket();

	const userLocation = useCurrentUserLocation({
		onLocationUpdate: (location) => {
			if (!trip || !socket) return;
			socket.emit('updateLocation', trip._id.toString(), location);
		},
	});

	const points = useMemo(
		() => trip?.stops.map((stop) => stop.location) || [],
		[trip]
	);

	const { routeData } = useMapboxDirectionRoute({
		points,
		runGetDirectionsRoute: !tripRoute,
	});

	useEffect(() => {
		if (!routeData) return;
		setTripRoute(routeData);
	}, [routeData]);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map>
				{userLocation && <UserMarker location={userLocation} />}
				{tripRoute && <MapRoute route={tripRoute} />}
				{usersLocations.map(({ id, location }) => (
					<OtherUserMarker location={location} key={id} />
				))}
				{trip?.stops.map((stop) => {
					return (
						<GeneralMarker
							key={`${stop.location.lat}-${stop.location.lon}`}
							location={stop.location}
						>
							<StopMarker stop={stop} />
						</GeneralMarker>
					);
				})}
			</Map>
			<DirectionComponent
				steps={tripRoute?.routes[0].legs[0].steps || []}
				nextStepIndex={0}
			/>
		</div>
	);
}
