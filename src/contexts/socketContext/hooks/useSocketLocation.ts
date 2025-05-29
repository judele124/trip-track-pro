import { useEffect, useState } from 'react';
import { SocketClientType } from '@/types/socket';
import { IUrgentNotification, IUserLocation } from '../types';

export default function useSocketLocation({
	socket,
	addUrgentNotification,
}: {
	socket: SocketClientType | null;
	addUrgentNotification: (notification: IUrgentNotification) => void;
}): {
	usersLocations: IUserLocation[];
} {
	const [usersLocations, setUsersLocations] = useState<IUserLocation[]>([]);

	useEffect(() => {
		if (!socket) return;
		socket.on('locationUpdated', (userId, location) => {
			setUsersLocations((prev) => {
				const index = prev.findIndex((user) => user.id === userId);
				if (index === -1) {
					return [...prev, { id: userId, location }];
				}
				return [
					...prev.slice(0, index),
					{ id: userId, location },
					...prev.slice(index + 1),
				];
			});
		});

		socket.on('userIsOutOfTripRoute', (userId) => {
			addUrgentNotification({
				userId,
				message: 'User is out of trip route',
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
				status: 'bad',
			});
		});
	}, [socket]);

	return { usersLocations };
}
