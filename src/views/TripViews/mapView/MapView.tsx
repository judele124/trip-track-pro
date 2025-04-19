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
		if (!routeData) {
			return [];
		}
		return routeData.routes[0].geometry.coordinates.map((coord) => ({
			lat: coord[1],
			lon: coord[0],
		}));
	}, [routeData]);

	const fakeLocation = useFakeUserLocation({
		points: [
			...fakePoints.slice(0, fakePoints.length / 2),
			...fakePoints.slice(0, fakePoints.length / 2).reverse(),
		],
		speed: 40,
		updateIntervalMs: 200,
	});

	useEffect(() => {
		if (!routeData) return;
		setTripRoute(routeData);
	}, [routeData]);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map>
				{fakeLocation && <UserMarker location={fakeLocation} />}
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
