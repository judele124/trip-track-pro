import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../../env.config';
import { SocketClientType } from '@/types/socket';
import useUsersExpData from './hooks/useUsersExpData';
import useSocketMessages, {
	UnreadMessagesStateType,
} from './hooks/useSocketMessages';
import useSocketExperiences from './hooks/useSocketExperiences';
import useSocketNotifications from './hooks/useSocketNotifications';
import {
	IRedisUserTripData,
	IUserLocation,
	UrgentNotificationType,
	Notification,
	IMessage,
	UserOutOfRouteNotification,
} from './types';
import { useAuthContext } from '../AuthContext';
import { useTripContext } from '../TripContext';

export interface ISocketContextValue {
	socket: SocketClientType | null;
	messages: IMessage[];
	addMsgToMsgs: (message: IMessage) => void;
	usersLocations: IUserLocation[];
	usersInLiveTripExpData: IRedisUserTripData[];
	currentExpIndex: number;
	unreadMessagesState: UnreadMessagesStateType;
	setUnreadMessagesState: (state: UnreadMessagesStateType) => void;
	setExperienceActive: (value: boolean) => void;
	isExperienceActive: boolean;
	addUrgentNotification: (notification: UrgentNotificationType) => void;
	setNotification: Dispatch<SetStateAction<Notification | null>>;
	setIsUrgentNotificationActive: Dispatch<SetStateAction<boolean>>;
	isUrgentNotificationActive: boolean;
	notification: Notification | null;
	urgentNotifications: UrgentNotificationType[];
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const { tripId } = useTripContext();

	const { user } = useAuthContext();
	const [socket, setSocket] = useState<SocketClientType | null>(null);
	const [usersLocations, setUsersLocations] = useState<IUserLocation[]>([]);

	const {
		initUsersLiveData,
		setUsersInLiveTripExpData,
		usersInLiveTripExpData,
	} = useUsersExpData({ tripId });

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
		if (!tripId || socket) return;

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
	}, [tripId]);

	useEffect(() => {
		if (!socket || !tripId || !user) return;

		socket.on('connect', () => {
			console.log('Connected to socket');
		});

		socket.emit('joinTrip', tripId, user._id);

		socket.on('tripJoined', (userData) => {
			setUsersInLiveTripExpData((prev) => {
				const index = prev.findIndex((user) => user.userId === userData.userId);

				if (index === -1) return [...prev, userData];

				const newUsersData = [...prev];
				newUsersData[index] = userData;
				return newUsersData;
			});
		});

		socket.on('locationUpdated', (userId, location) => {
			setUsersLocations((prev) => {
				const index = prev.findIndex((user) => user.id === userId);
				if (index === -1) {
					return [...prev, { id: userId, location }];
				}
				const newLocation = [...prev];
				newLocation[index].location = location;
				return newLocation;
			});
		});

		socket.on('userIsOutOfTripRoute', (userId) => {
			const not = new UserOutOfRouteNotification(userId);
			addUrgentNotification(not);
		});

		socket.on('allUsersInExperience', () => {
			setExperienceActive(true);
		});

		socket.on('experienceFinished', (data, userId) => {
			setUsersInLiveTripExpData((prev) => {
				const userIndex = prev.findIndex((user) => user.userId === userId);
				if (userIndex === -1) {
					return [...prev, data];
				}

				const newUsersData = [...prev];
				newUsersData[userIndex] = data;
				return newUsersData;
			});
		});

		socket.on('allUsersFinishedCurrentExp', (nextStepIndex) => {
			setCurrentExpIndex(nextStepIndex);
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
	}, [user, socket]);

	useEffect(() => {
		if (!socket) return;

		const handleMessageSent = (message: string, userId: string) => {
			const timestamp = new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
			const userName =
				usersInLiveTripExpData.find((user) => {
					return user.userId === userId;
				})?.name || 'Unknown';

			addMsgToMsgs({
				userId,
				message,
				timestamp,
				userName,
			});
		};

		socket.on('messageSent', handleMessageSent);

		return () => {
			socket.removeListener('messageSent', handleMessageSent);
		};
	}, [socket, usersInLiveTripExpData]);

	return (
		<tripSocketContext.Provider
			value={{
				socket,
				messages,
				addMsgToMsgs,
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
