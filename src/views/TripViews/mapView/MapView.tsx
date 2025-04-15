import Map from './Map';
import { useEffect, useMemo, useState } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/StopMarker';
import GeneralMarker from './components/GeneralMarker';
import UserMarker from './components/UserMarker';
import { useMapboxDirectionRoute } from './hooks/useMapboxDirectionRoute';
import DirectionComponent from './components/DirectionComponent';
import MapRoute from './components/MapRoute';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';
import useCurrentUserBearing from './hooks/useCurrentUserBearing';

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

	useEffect(() => {
		if (!routeData) return;
		setTripRoute(routeData);
	}, [routeData]);

	const bearing = useCurrentUserBearing({ userLocation });

	const [nextStepIndex, setNextStepIndex] = useState<number>(0);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map>
				{routeData?.routes[0].legs[0].steps.map(
					(
						{
							maneuver: {
								location: [lon, lat],
							},
						},
						i
					) => {
						return (
							<GeneralMarker key={`${lat}-${lon}`} location={{ lat, lon }}>
								<div
									className={`rounded-full bg-red-500 ${i === nextStepIndex ? 'size-5 animate-bounce bg-blue-500' : 'size-2'}`}
								></div>
							</GeneralMarker>
						);
					}
				)}
				{userLocation && <UserMarker location={userLocation} />}
				{tripRoute && <MapRoute route={tripRoute} />}
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

			{tripRoute?.routes[0].legs[0].steps && (
				<DirectionComponent
					steps={tripRoute.routes[0].legs[0].steps}
					nextStepIndex={nextStepIndex}
				/>
			)}
		</div>
	);
}
