import { Types } from 'trip-track-package';

export type Trip = Omit<
	Types['Trip']['Model'],
	'reward' | '_id' | 'creator' | 'guides'
> & {
	_id: string;
	creator: string;
	guides: string[];
	reward?: {
		title: string;
		image?: string;
	};
};
