import Map from './Map';
import { useEffect } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';
import { useTripSocket } from '@/contexts/SocketContext';
import StopMarker from './components/StopMarker';
import GeneralMarker from './components/GeneralMarker';
import UserMarker from './components/UserMarker';
import useCurrentUserLocation from './hooks/useCurrentUserLocation';

export default function MapView() {
	const { trip } = useTripContext();
	const { socket } = useTripSocket();
	const userLocation = useCurrentUserLocation({
		onLocationUpdate: (location) => {
			console.log('Location from useCurrentUserLocation', location);
		},
	});

	const stops = trip?.stops.map((stop) => stop.location) || [];

	const nav = useNavigate();

	useEffect(() => {
		if (!trip && !socket) nav(navigationRoutes.notFound);
	}, []);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map routeOriginalPoints={stops}>
				{userLocation && (
					<GeneralMarker location={userLocation}>
						<UserMarker />
					</GeneralMarker>
				)}

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
		</div>
	);
}
