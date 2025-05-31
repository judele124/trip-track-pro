import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../../env.config';
import { SocketClientType } from '@/types/socket';
import useSocketTrip from './hooks/useSocketTrip';
import useSocketMessages from './hooks/useSocketMessages';
import useSocketExperiences from './hooks/useSocketExperiences';
import useSocketNotifications from './hooks/useSocketNotifications';
import {
	IRedisUserTripData,
	IUserLocation,
	UrgentNotificationType,
	INotification,
	IMessage,
} from './types';
import { useAuthContext } from '../AuthContext';

export interface ISocketContextValue {
	socket: SocketClientType | null;
	messages: IMessage[];
	addMsgToMsgs: (message: IMessage) => void;
	usersInLiveTripData: IRedisUserTripData[] | undefined;
	usersLocations: IUserLocation[];
	usersInLiveTripExpData: IRedisUserTripData[];
	currentExpIndex: number;
	unreadMessagesState: {
		count: number;
		isInChat: boolean;
	};
	setUnreadMessagesState: (state: { count: number; isInChat: boolean }) => void;
	setExperienceActive: (value: boolean) => void;
	isExperienceActive: boolean;
	addUrgentNotification: (notification: UrgentNotificationType) => void;
	setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
	setIsUrgentNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
	isUrgentNotificationActive: boolean;
	notification: INotification | null;
	urgentNotifications: UrgentNotificationType[];
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const { user } = useAuthContext();
	const [socket, setSocket] = useState<SocketClientType | null>(null);
	const [usersLocations, setUsersLocations] = useState<IUserLocation[]>([]);

	const {
		initUsersLiveData,
		setUsersInLiveTripExpData,
		tripId,
		trip,
		usersInLiveTripData,
		usersInLiveTripExpData,
		loadingUsersInLiveTripData,
	} = useSocketTrip();

	const {
		addUrgentNotification,
		setNotification,
		setIsUrgentNotificationActive,
		isUrgentNotificationActive,
		notification,
		urgentNotifications,
	} = useSocketNotifications();

	const {
		initExpirenceIndex,
		setExperienceActive,
		currentExpIndex,
		isExperienceActive,
		setCurrentExpIndex,
	} = useSocketExperiences({
		tripId,
	});

	const {
		addMsgToMsgs,
		setUnreadMessagesState,
		messages,
		unreadMessagesState,
	} = useSocketMessages();

	useEffect(() => {
		if (!tripId || !trip || socket) return;

		const socketClient: SocketClientType = io(API_BASE_URL, {
			query: { tripId },
		});

		setSocket(socketClient);

		initUsersLiveData();
		initExpirenceIndex();

		return () => {
			socketClient.disconnect();
			console.log('Socket disconnected');
		};
	}, [tripId, trip]);

	useEffect(() => {
		if (!socket || !tripId || !user) return;
		socket.on('connect', () => {
			console.log('Connected to socket');
		});

		socket.emit('joinTrip', tripId, user._id);

		socket.on('tripJoined', (userData) => {
			setUsersInLiveTripExpData((prev) => {
				const isExist = prev.some((user) => user.userId === userData.userId);
				if (isExist) return prev;
				return [...prev, userData];
			});
		});

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
				status: 'bad',
				message: 'user is out of trip route',
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
				userId,
			});
		});

		socket.on('allUsersInExperience', (isAllUSersInExperience) => {
			setExperienceActive(true);
		});

		socket.on('experienceFinished', (data, userId) => {
			setUsersInLiveTripExpData((prev) => {
				const userIndex = prev.findIndex((user) => user.userId === userId);
				if (userIndex === -1) {
					return [...prev, data];
				}
				return [
					...prev.slice(0, userIndex),
					data,
					...prev.slice(userIndex + 1),
				];
			});
		});

		socket.on('allUsersFinishedCurrentExp', (nextStepIndex) => {
			setCurrentExpIndex(nextStepIndex);
		});

		socket.on('messageSent', (message, userId) => {
			addMsgToMsgs({
				userId,
				message,
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
				userName: usersInLiveTripData?.find((user) => user.userId === userId)
					?.name,
			});
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from socket');
		});

		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
		});

		return () => {
			socket.removeAllListeners();
		};
	}, [socket, usersInLiveTripData]);

	return (
		<tripSocketContext.Provider
			value={{
				socket,
				messages,
				addMsgToMsgs,
				usersInLiveTripData,
				usersLocations,
				usersInLiveTripExpData,
				currentExpIndex,
				setExperienceActive,
				isExperienceActive,
				unreadMessagesState,
				setUnreadMessagesState,
				isUrgentNotificationActive,
				urgentNotifications,
				addUrgentNotification,
				setNotification,
				setIsUrgentNotificationActive,
				notification,
			}}
		>
			{children}
		</tripSocketContext.Provider>
	);
}

export const useTripSocket = () => {
	const context = useContext(tripSocketContext);
	if (!context) {
		throw new Error('useTripSocket must be used within a TripSocketProvider');
	}
	return context;
};
