import { SocketClientType } from '@/types/socket';
import { useEffect, useRef, useState } from 'react';
import { IUrgentNotification, INotification } from '../types';

interface IUseSocketNotificationsValue {
	isNotificationActive: boolean;
	notification: INotification | null;
	urgentNotifications: IUrgentNotification[];
	setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
	setIsNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
	addUrgentNotification: (notification: IUrgentNotification) => void;
}

export default function useSocketNotifications({
	socket,
}: {
	socket: SocketClientType | null;
}): IUseSocketNotificationsValue {
	const lastUrgentNotificationsLength = useRef(0);
	const [urgentNotifications, setUrgentNotifications] = useState<
		IUrgentNotification[]
	>([]);
	const [isNotificationActive, setIsNotificationActive] =
		useState<boolean>(false);
	const [notification, setNotification] = useState<INotification | null>(null);

	const addUrgentNotification = (notification: IUrgentNotification) => {
		setUrgentNotifications((prev) => [...prev, notification]);
	};

	useEffect(() => {
		if (urgentNotifications.length > lastUrgentNotificationsLength.current) {
			lastUrgentNotificationsLength.current = urgentNotifications.length;
			setIsNotificationActive(true);
		}
	}, [urgentNotifications]);

	useEffect(() => {
		if (!socket) return;

		socket.on('userIsOutOfTripRoute', (userId) => {
			addUrgentNotification({
				userId,
				message: 'User is out of trip',
				status: 'bad',
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
			});
		});
	}, [socket]);

	return {
		isNotificationActive,
		setIsNotificationActive,
		notification,
		urgentNotifications,
		setNotification,
		addUrgentNotification,
	};
}
