import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../env.config';
import { SocketClientType } from '@/types/socket';
import { useTripContext } from './TripContext';
import useAxios from '@/hooks/useAxios';

export interface IMessage {
	userId: string;
	message: string;
	timestamp: string;
}

export interface IRedisUserTripData {
	imageUrl: string;
	name: string;
	score: number[]; // score for each experience in the trip
	finishedExperiences: boolean[];
	userId: string;
}

export interface IUserLocation {
	id: string;
	location: { lat: number; lon: number };
}

interface ISocketContextValue {
	socket: SocketClientType | null;
	messages: IMessage[];
	addMsgToMsgs: (message: IMessage) => void;
	usersInLiveTripData: IRedisUserTripData[] | undefined;
	usersLocations: IUserLocation[];
	usersInLiveTripExpData: IRedisUserTripData[];
	currentExpIndex: number;
	isTripActive: boolean;
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const [socket, setSocket] = useState<SocketClientType | null>(null);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const { tripId, trip } = useTripContext();
	const [usersLocations, setUsersLocations] = useState<IUserLocation[]>([]);
	const [usersInLiveTripExpData, setUsersInLiveTripExpData] = useState<
		IRedisUserTripData[]
	>([]);
	const [currentExpIndex, setCurrentExpIndex] = useState<number>(0);
	const [isTripActive, setIsTripActive] = useState<boolean>(false);

	const { activate, data: usersInLiveTripData } = useAxios<
		IRedisUserTripData[]
	>({
		manual: true,
	});

	const { activate: activateGetExpIndex, data: dataCurrentExpIndex } =
		useAxios<{ data: number }>({
			manual: true,
		});

	const addMsgToMsgs = (message: IMessage) => {
		setMessages((prev) => [...prev, message]);
	};

	const initUsersLiveData = async () => {
		const { data: usersLiveData } = await activate({
			url: `${API_BASE_URL}/trip/${tripId}/users`,
		});
		if (usersLiveData) {
			setUsersInLiveTripExpData(usersLiveData);
		}
	};

	const initExpirenceIndex = async () => {
		const { data } = await activateGetExpIndex({
			url: `${API_BASE_URL}/trip/current-exp-index/${tripId}`,
		});
		if (data) {
			setCurrentExpIndex(data.data || 0);
		}
	};

	useEffect(() => {
		if (!tripId || !trip || socket) return;

		const socketClient: SocketClientType = io(API_BASE_URL, {
			query: { tripId },
		});

		setSocket(socketClient);
		setIsTripActive(trip.status === 'started');
		initUsersLiveData();
		initExpirenceIndex();
	}, [tripId, trip]);

	useEffect(() => {
		if (!socket || !tripId) return;

		socket.emit('joinTrip', tripId);

		socket.on('tripJoined', (userId) => {
			console.log('User joined trip:', userId);
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

		socket.on('experienceFinished', (data, userId, index) => {
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
			});
		});

		socket.on('finishedTrip', () => {
			setIsTripActive(false);
		});

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
			socket.disconnect();
			console.log('Socket disconnected');
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
				isTripActive,
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
