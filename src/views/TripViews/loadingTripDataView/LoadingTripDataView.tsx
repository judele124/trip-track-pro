import { useTripSocket } from '@/contexts/SocketContext';
import { useTripContext } from '@/contexts/TripContext';
import { navigationRoutes } from '@/Routes/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingTripDataView() {
	const { trip } = useTripContext();
	const { initialSocket } = useTripSocket();
	const nav = useNavigate();

	useEffect(() => {
		if (!trip?._id) {
			nav(navigationRoutes.notFound);
			return;
		}
		initialSocket(trip._id.toString());
		nav(navigationRoutes.map);
	}, [trip]);

	return null;
}
