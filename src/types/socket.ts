import { Socket } from 'socket.io-client';

export interface ServerToClientEvents {
	tripJoined: (userSocketId: string) => void;
	locationUpdated: (
		userId: string,
		location: { lat: number; lon: number }
	) => void;
	tripStatusChanged: (tripId: string, status: string) => void;
	error: (
		data: { errorDetails: Record<string, any>; message: string } | string
	) => void;
}

export interface ClientToServerEvents {
	joinTrip: (tripId: string) => void;
	updateLocation: (
		tripId: string,
		{ lon, lat }: { lon: number; lat: number }
	) => void;
	'connect-error': (error: Error) => void;
}

export type SocketClientType = Socket<
	ServerToClientEvents,
	ClientToServerEvents
>;
