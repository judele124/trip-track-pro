import { act, ReactNode, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';
import { useTripContext } from '@/contexts/TripContext';
import { Schemas } from 'trip-track-package';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';

type TripProtectedRouteProps = {
	children: ReactNode;
};

export default function TripProtectedRoute({
	children,
}: TripProtectedRouteProps) {
	const { user, tokenValidationStatus } = useAuthContext();
	const { tripId, trip } = useTripContext();
	const { activate } = useAxios({ manual: true });
	const nav = useNavigate();

	const addUserToTripParticipants = async () => {
		await activate({
			url: `${API_BASE_URL}/trip/user-to-participants/${tripId}`,
			method: 'PUT',
		});
	};

	useEffect(() => {
		if (tokenValidationStatus && !user) {
			nav(`${navigationRoutes.joinTrip}?tripId=${tripId}`);
			return;
		}

		if (!trip) return;

		const isValidUserId = Schemas.mongoObjectId.safeParse(user?._id).success;

		if (isValidUserId) {
			const isParticipant = trip.participants.some(
				(participant) => participant.userId._id === user?._id
			);

			if (isParticipant) return;
			addUserToTripParticipants();
		}
	}, [tokenValidationStatus, trip]);

	return <>{children}</>;
}
