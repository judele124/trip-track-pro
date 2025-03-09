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

interface ISocketContextValue {
	socket: SocketClientType | null;
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const [socket, setSocket] = useState<SocketClientType | null>(null);
	const { tripId, trip } = useTripContext();

	useEffect(() => {
		if (!tripId || !trip || socket) return;

		const socketClient: SocketClientType = io(API_BASE_URL, {
			query: { tripId },
		});

		setSocket(socketClient);
	}, [tripId, trip]);

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

		socket.on('messageSent', (message) => {
			console.log('Message as received:', message);
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
		<tripSocketContext.Provider value={{ socket }}>
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
