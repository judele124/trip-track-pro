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
	message: string;
	status: 'good' | 'bad' | 'warning' | 'default';
	timestamp: string;
	icon?: IconName;
}

export interface IUrgentNotification extends INotification {
	userId: string;
}

export interface IUserLocation {
	id: string;
	location: { lat: number; lon: number };
}
