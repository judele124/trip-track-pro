import { IRedisUserTripData } from '@/contexts/socketContext/types';
import { Socket } from 'socket.io-client';

type LocationPayload = {
	lon: number;
	lat: number;
};

type ClientEventPayloads = {
	joinTrip: [tripId: string, userId: string];
	updateLocation: [tripId: string, location: LocationPayload];
	finishExperience: [
		tripId: string,
		userId: string,
		index: number,
		score: number,
	];
	sendMessage: [tripId: string, message: string, userId: string];
	userInExperience: [tripId: string, userId: string, index: number];
	currentUserOutOfTripRoute: [tripId: string, userId: string];
	'connect-error': [error: Error];
};

type ServerEventPayloads = {
	tripJoined: [userData: IRedisUserTripData];
	locationUpdated: [userSocketId: string, location: LocationPayload];
	experienceFinished: [
		updateData: IRedisUserTripData,
		userId: string,
		index: number,
	];
	messageSent: [message: string, userId: string];
	tripStatusChanged: [tripId: string, status: string];
	allUsersInExperience: [isAllUSersInExperience: boolean];
	allUsersFinishedCurrentExp: [nextExpIndex: number];
	userIsOutOfTripRoute: [userId: string];
	userDisconnected: [userId: string];
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
	allUsersInExperience: 'allUsersInExperience',
	allUsersFinishedCurrentExp: 'allUsersFinishedCurrentExp',
	userIsOutOfTripRoute: 'userIsOutOfTripRoute',
	userDisconnected: 'userDisconnected',
	error: 'error',
};

export const ClientEvents = {
	joinTrip: 'joinTrip',
	updateLocation: 'updateLocation',
	finishExperience: 'finishExperience',
	sendMessage: 'sendMessage',
	userInExperience: 'userInExperience',
	currentUserOutOfTripRoute: 'currentUserOutOfTripRoute',
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
