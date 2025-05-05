import Map from './Map';
import { useEffect, useMemo } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/Markers/StopMarker';
import GeneralMarker from './components/Markers/GeneralMarker';
import CurrentUserMarker from './components/Markers/CurrentUserMarker';
import { useMapboxDirectionRoute } from './hooks/useMapboxDirectionRoute';
import DirectionComponent from './components/DirectionComponent';
import MapRoute from './components/MapRoute';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import OtherUserMarker from './components/Markers/OtherUserMarker';

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
				{tripRoute && <MapRoute route={tripRoute} />}

				{userLocation && <CurrentUserMarker location={userLocation} />}
				{usersLocations.map(({ id, location }) => (
					<OtherUserMarker location={location} key={id} />
				))}

				{trip?.stops.map((stop, i) => {
					return (
						<GeneralMarker
							key={`${stop.location.lat}-${stop.location.lon}-${i}`}
							location={stop.location}
						>
							<StopMarker disableExperience={i == 1} stop={stop} index={i} />
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
