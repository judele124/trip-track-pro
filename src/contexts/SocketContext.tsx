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

	const { activate, data: usersInLiveTripData } = useAxios<
		IRedisUserTripData[]
	>({
		manual: true,
	});

	const addMsgToMsgs = (message: IMessage) => {
		setMessages((prev) => [...prev, message]);
	};

	useEffect(() => {
		if (!tripId || !trip || socket) return;

		const socketClient: SocketClientType = io(API_BASE_URL, {
			query: { tripId },
		});

		setSocket(socketClient);

		activate({ url: `${API_BASE_URL}/trip/${tripId}/users` });
	}, [tripId, trip]);

	useEffect(() => {
		if (!socket || !tripId) return;

		socket.emit('joinTrip', tripId);

		socket.on('tripJoined', (userId) => {
			console.log('User joined trip:', userId);
		});

		socket.on('locationUpdated', (userId, location) => {
			console.log('Location updated:', userId, location);
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

		socket.on('experienceFinished', (userId) => {
			console.log('Experience finished:', userId);
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
