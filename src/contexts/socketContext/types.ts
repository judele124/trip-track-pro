import { IconName } from '@/components/icons/Icon';

export interface IRedisUserTripData {
	imageUrl: string;
	name: string;
	score: number[]; // score for each experience in the trip
	finishedExperiences: boolean[];
	userId: string;
}

export interface IMessage {
	userId: string;
	message: string;
	timestamp: string;
	userName?: string;
}

export interface INotification {
	status: 'good' | 'bad' | 'warning' | 'default';
	timestamp: string;
	icon?: IconName;
	message: string;
}

export interface IBadNotification extends INotification {
	status: 'bad';
}

export interface UserOutOfRouteNotification extends IBadNotification {
	userId: string;
	message: 'user is out of trip route';
}

export type UrgentNotificationType = UserOutOfRouteNotification;
export interface IUserLocation {
	id: string;
	location: { lat: number; lon: number };
}
