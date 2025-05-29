import { useTripContext } from '@/contexts/TripContext';
import useAxios from '@/hooks/useAxios';
import { SocketClientType } from '@/types/socket';
import { useEffect, useState } from 'react';
import { IRedisUserTripData } from '../types';
import { API_BASE_URL } from '@/env.config';
import { Trip } from '@/types/trip';

export interface ITripSocketProviderValue {
	tripId: string;
	trip: Trip | null;
	usersInLiveTripExpData: IRedisUserTripData[];
	usersInLiveTripData: IRedisUserTripData[] | undefined;
	loadingUsersInLiveTripData: boolean;
	initUsersLiveData: () => void;
	setUsersInLiveTripExpData: React.Dispatch<
		React.SetStateAction<IRedisUserTripData[]>
	>;
}

export default function useSocketTrip({
	socket,
}: {
	socket: SocketClientType | null;
}): ITripSocketProviderValue {
	const { tripId, trip } = useTripContext();
	const [usersInLiveTripExpData, setUsersInLiveTripExpData] = useState<
		IRedisUserTripData[]
	>([]);

	const {
		activate: activateGetUsersInLiveTripData,
		data: usersInLiveTripData,
		loading: loadingUsersInLiveTripData,
	} = useAxios<IRedisUserTripData[]>({
		manual: true,
	});

	const initUsersLiveData = async () => {
		const { data: usersLiveData } = await activateGetUsersInLiveTripData({
			url: `${API_BASE_URL}/trip/${tripId}/users`,
		});
		if (usersLiveData) {
			setUsersInLiveTripExpData(usersLiveData);
		}
	};

	useEffect(() => {
		if (!socket || !tripId) return;
		socket.emit('joinTrip', tripId);

		socket.on('tripJoined', (userId) => {
			console.log('User joined trip:', userId);
		});
	}, [socket, tripId]);

	return {
		tripId,
		trip,
		usersInLiveTripData,
		usersInLiveTripExpData,
		loadingUsersInLiveTripData,
		initUsersLiveData,
		setUsersInLiveTripExpData,
	};
}
