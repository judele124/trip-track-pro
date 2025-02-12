import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../env.config';
import { SocketClientType } from '@/types/socket';

interface ISocketContextValue {
	initialSocket: (tripId: string) => void;
	socket: SocketClientType | null;
}

interface ITripSocketProviderProps {
	children: ReactNode;
}

const tripSocketContext = createContext<ISocketContextValue | null>(null);

export default function SocketProvider({ children }: ITripSocketProviderProps) {
	const [socket, setSocket] = useState<SocketClientType | null>(null);
	const [tripId, setTripId] = useState<string | null>(null);
	const currentUserLocationInterval = useRef<number>();

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

		// currentUserLocationInterval.current = setInterval(() => {
		//   navigator.geolocation.getCurrentPosition(
		//     (position) => {
		//       socket.emit("updateLocation", tripId, {
		//         lon: position.coords.longitude,
		//         lat: position.coords.latitude,
		//       });
		//     },
		//     (err) => {
		//       console.error(err);
		//     },
		//   );
		// }, 2000);

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

			clearInterval(currentUserLocationInterval.current);
		};
	}, [socket, tripId]);

	return (
		<tripSocketContext.Provider value={{ initialSocket, socket }}>
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
