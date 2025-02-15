import { Socket } from 'socket.io-client';

type LocationPayload = {
	lon: number;
	lat: number;
};

type ClientEventPayloads = {
	joinTrip: [tripId: string];
	updateLocation: [tripId: string, location: LocationPayload];
	finishExperience: [tripId: string];
	sendMessage: [tripId: string, message: string];
	'connect-error': [error: Error];
};

type ServerEventPayloads = {
	tripJoined: [userSocketId: string];
	locationUpdated: [userSocketId: string, location: LocationPayload];
	experienceFinished: [userSocketId: string];
	messageSent: [message: string];
	tripStatusChanged: [tripId: string, status: string];
	error: [
		data: string | { message: string; errorDetails: Record<string, any> },
	];
};

export const ServerEvents = {
	tripJoined: 'tripJoined',
	locationUpdated: 'locationUpdated',
	experienceFinished: 'experienceFinished',
	messageSent: 'messageSent',
	tripStatusChanged: 'tripStatusChanged',
	error: 'error',
};

export const ClientEvents = {
	joinTrip: 'joinTrip',
	updateLocation: 'updateLocation',
	finishExperience: 'finishExperience',
	sendMessage: 'sendMessage',
	connectError: 'connect-error',
} as const;

type ClientToServerEvents = {
	[K in keyof ClientEventPayloads]: (...args: ClientEventPayloads[K]) => void;
};

type ServerToClientEvents = {
	[K in keyof ServerEventPayloads]: (...args: ServerEventPayloads[K]) => void;
};

export type SocketClientType = Socket<
	ServerToClientEvents,
	ClientToServerEvents
>;
