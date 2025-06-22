import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';
import useTripId from '@/hooks/useTripId';

export default function TripProtectedRoute({
	children,
}: {
	children: ReactNode;
}) {
	const { user, tokenValidationStatus } = useAuthContext();
	const tripId = useTripId();
	const nav = useNavigate();

	useEffect(() => {
		if (tokenValidationStatus && !user) {
			nav(`${navigationRoutes.joinTrip}?tripId=${tripId}`);
		}
	}, [tokenValidationStatus]);

	return <>{children}</>;
}
