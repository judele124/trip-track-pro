import { useEffect, useRef, useState } from 'react';
import { UrgentNotificationType, Notification } from '../types';

interface IUseSocketNotificationsValue {
	isUrgentNotificationActive: boolean;
	notification: Notification | null;
	urgentNotifications: UrgentNotificationType[];
	setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
	setIsUrgentNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
	addUrgentNotification: (notification: UrgentNotificationType) => void;
}

export default function useSocketNotifications(): IUseSocketNotificationsValue {
	const lastUrgentNotificationsLength = useRef(0);
	const [urgentNotifications, setUrgentNotifications] = useState<
		UrgentNotificationType[]
	>([]);
	const [isUrgentNotificationActive, setIsUrgentNotificationActive] =
		useState<boolean>(false);
	const [notification, setNotification] = useState<Notification | null>(null);

	const addUrgentNotification = (notification: UrgentNotificationType) => {
		setUrgentNotifications((prev) => [...prev, notification]);
	};

	useEffect(() => {
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
	};
}
