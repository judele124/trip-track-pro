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
import useFakeUserLocation from './tests/useFakeUserLocation';
// import useCurrentUserLocation from './hooks/useCurrentUserLocation';

export default function MapView() {
	const { trip, setTripRoute, tripRoute } = useTripContext();
	useTripSocket();

	// const userLocation = useCurrentUserLocation({
	// 	onLocationUpdate: (location) => {
	// 		console.log('Location from useCurrentUserLocation', location);
	// 	},
	// });

	const points = useMemo(
		() => trip?.stops.map((stop) => stop.location) || [],
		[trip]
	);

	const { routeData } = useMapboxDirectionRoute({
		points,
		runGetDirectionsRoute: !tripRoute,
	});

	const fakePoints = useMemo(() => {
		return (
			routeData?.routes[0].geometry.coordinates.map((coord) => ({
				lat: coord[1],
				lon: coord[0],
			})) || []
		);
	}, [routeData]);

	const userFakePoints = [...fakePoints];
	userFakePoints.splice(3, 0, { lat: 31.7472120058, lon: 34.988442 });

	const fakeLocation = useFakeUserLocation({
		points: userFakePoints,
		speed: 10,
	});

	useEffect(() => {
		if (!routeData) return;
		setTripRoute(routeData);
	}, [routeData]);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map>
				{fakeLocation && <UserMarker location={fakeLocation} />}
				{tripRoute && <MapRoute route={tripRoute} />}
				{/* {trip?.stops.map((stop) => {
					return (
						<GeneralMarker
							key={`${stop.location.lat}-${stop.location.lon}`}
							location={stop.location}
						>
							<StopMarker stop={stop} />
						</GeneralMarker>
					);
				})} */}
				{tripRoute?.routes[0].legs[0].steps && (
					<DirectionComponent
						userLocation={fakeLocation}
						steps={tripRoute.routes[0].legs[0].steps}
						fakePoints={fakePoints}
					/>
				)}
			</Map>
		</div>
	);
}
