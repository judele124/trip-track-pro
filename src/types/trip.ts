import { Types } from 'trip-track-package';

export type Trip = Omit<
	Types['Trip']['Model'],
	'reward' | '_id' | 'creator' | 'guides'
> & {
	_id: string;
	creator: Types['User']['Model'];
	guides: string[];
	reward?: {
		title: string;
		image?: string;
	};
};
