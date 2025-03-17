import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../env.config';
import { SocketClientType } from '@/types/socket';

interface ISocketContextValue {
	initialSocket: (tripId: string) => void;
	socket: SocketClientType | null;
	messages: IMessage[];
	addMsgToMsgs: (message: IMessage) => void;
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

export interface IMessage {
	userId: string;
	message: string;
	timestamp: string;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const [socket, setSocket] = useState<SocketClientType | null>(null);
	const [tripId, setTripId] = useState<string | null>(null);
	const [messages, setMessages] = useState<IMessage[]>([]);

	const addMsgToMsgs = (message: IMessage) => {
		setMessages((prev) => [...prev, message]);
	};

	const initialSocket = (tripId: string) => {
		const socket: SocketClientType = io(API_BASE_URL, {
			query: { tripId },
		});

		setTripId(tripId);
		setSocket(socket);
	};

	useEffect(() => {
		if (!socket || !tripId) return;

		socket.emit('joinTrip', tripId);

		socket.on('tripJoined', (userId) => {
			console.log('User joined trip:', userId);
		});

		socket.on('locationUpdated', (userId, location) => {
			console.log('Location updated:', userId, location);
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
	}, [socket, tripId]);

	return (
		<tripSocketContext.Provider
			value={{
				initialSocket,
				socket,
				messages,
				addMsgToMsgs,
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
