import { useEffect, useRef, useState } from 'react';
import { UrgentNotificationType, Notification } from '../types';
import { useLocation } from 'react-router-dom';

interface IUseSocketNotificationsValue {
	isUrgentNotificationActive: boolean;
	notification: Notification | null;
	urgentNotifications: UrgentNotificationType[];
	setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
	setIsUrgentNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
	addUrgentNotification: (notification: UrgentNotificationType) => void;
	unreadUrgentNotificationsCount: number;
	resetUnreadUrgentNotificationsCount: () => void;
}

export default function useSocketNotifications(): IUseSocketNotificationsValue {
	const lastUrgentNotificationsLength = useRef(0);
	const [urgentNotifications, setUrgentNotifications] = useState<
		UrgentNotificationType[]
	>([]);
	const [unreadUrgentNotificationsCount, setUnreadUrgentNotificationsCount] =
		useState(0);

	const [isUrgentNotificationActive, setIsUrgentNotificationActive] =
		useState<boolean>(false);
	const [notification, setNotification] = useState<Notification | null>(null);
	const currentRoute = useLocation().pathname;

	const addUrgentNotification = (notification: UrgentNotificationType) => {
		setUrgentNotifications((prev) => [...prev, notification]);
		setUnreadUrgentNotificationsCount((prev) => prev + 1);
	};

	useEffect(() => {
		if (currentRoute === '/trip/urgent-notifications') return;
		if (urgentNotifications.length > lastUrgentNotificationsLength.current) {
			lastUrgentNotificationsLength.current = urgentNotifications.length;
			setIsUrgentNotificationActive(true);
		}
	}, [urgentNotifications]);

	return {
		isUrgentNotificationActive,
		setIsUrgentNotificationActive,
		notification,
		urgentNotifications,
		setNotification,
		addUrgentNotification,
		unreadUrgentNotificationsCount,
		resetUnreadUrgentNotificationsCount: () => {
			setUnreadUrgentNotificationsCount(0);
		},
	};
}
