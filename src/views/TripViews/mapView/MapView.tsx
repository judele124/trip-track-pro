import Map from './Map';
import { useEffect, useMemo } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/StopMarker';
import GeneralMarker from './components/GeneralMarker';
import UserMarker from './components/UserMarker';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import { useMapboxDirectionRoute } from './hooks/useMapboxDirectionRoute';
import DirectionComponent from './components/DirectionComponent';
import useFakeUserLocation from './tests/useFakeUserLocation';

export default function MapView() {
	const { trip, setTripRoute, tripRoute } = useTripContext();
	useTripSocket();

	const userLocation = useCurrentUserLocation({
		onLocationUpdate: (location) => {
			console.log('Location from useCurrentUserLocation', location);
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

	const pointsForFakeUserLocation = useMemo(
		() =>
			tripRoute?.routes[0].geometry.coordinates.map((coord) => ({
				lat: coord[1],
				lon: coord[0],
			})) || [],
		[tripRoute]
	);

	const fakeUserLocation = useFakeUserLocation({
		points: pointsForFakeUserLocation || [],
		speed: 10,
		onLocationUpdate: (location) => {
			console.log('Location from useCurrentUserLocation', location);
		},
	});

	useEffect(() => {
		if (!routeData) return;
		setTripRoute(routeData);
	}, [routeData]);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map mapboxDirectionRoute={tripRoute}>
				{userLocation && <UserMarker location={userLocation} />}
				{fakeUserLocation && <UserMarker location={fakeUserLocation} />}

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
				userLocation={fakeUserLocation}
				routeData={tripRoute}
			/>
		</div>
	);
}
