import Map from './Map';
import { useEffect } from 'react';
import { useTripContext } from '@/contexts/TripContext';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';
import { useTripSocket } from '@/contexts/SocketContext';
import GeneralMarker from './components/GeneralMarker';
import StopMarker from './components/StopMarker';
import { useMapContext } from '@/contexts/MapContext';
export default function MapView() {
	const { socket } = useTripSocket();
	const { trip } = useTripContext();
	const { mapRef } = useMapContext();
	const stops = trip?.stops.map((stop) => stop.location) || [];

	const nav = useNavigate();

	useEffect(() => {
		if (!trip && !socket) nav(navigationRoutes.notFound);
	}, []);

	return (
		<div className='page-colors mx-auto h-full max-w-[400px]'>
			<Map routeOriginalPoints={stops}>
				{stops.map((stop, i) => (
					<GeneralMarker
						key={i}
						location={stop}
						isMapReady={true}
						mapRef={mapRef}
					>
						<StopMarker />
					</GeneralMarker>
				))}
			</Map>
		</div>
	);
}
