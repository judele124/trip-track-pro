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
import useSocketLocation from './hooks/useSocketLocation';
import useSocketNotifications from './hooks/useSocketNotifications';
import {
	IRedisUserTripData,
	IUserLocation,
	IUrgentNotification,
	INotification,
	IMessage,
} from './types';

interface ISocketContextValue {
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
	addUrgentNotification: (notification: IUrgentNotification) => void;
	setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
	setIsNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
	isNotificationActive: boolean;
	notification: INotification | null;
	urgentNotifications: IUrgentNotification[];
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const [socket, setSocket] = useState<SocketClientType | null>(null);

	const {
		initUsersLiveData,
		setUsersInLiveTripExpData,
		tripId,
		trip,
		usersInLiveTripData,
		usersInLiveTripExpData,
		loadingUsersInLiveTripData,
	} = useSocketTrip({ socket });

	const {
		addUrgentNotification,
		setNotification,
		setIsNotificationActive,
		isNotificationActive,
		notification,
		urgentNotifications,
	} = useSocketNotifications({ socket });

	const { usersLocations } = useSocketLocation({
		socket,
		addUrgentNotification,
	});

	const {
		initExpirenceIndex,
		setExperienceActive,
		currentExpIndex,
		isExperienceActive,
	} = useSocketExperiences({
		socket,
		tripId,
		setUsersInLiveTripExpData,
	});

	const {
		addMsgToMsgs,
		setUnreadMessagesState,
		messages,
		unreadMessagesState,
	} = useSocketMessages({
		socket,
		usersInLiveTripData,
	});

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
		if (!socket) return;
		socket.on('connect', () => {
			console.log('Connected to socket');
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
	}, [socket]);

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
				isNotificationActive,
				urgentNotifications,
				addUrgentNotification,
				setNotification,
				setIsNotificationActive,
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
