import useAxios from '@/hooks/useAxios';
import { useTripShowcase } from '../components/TripsShowcase';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';
import {
	cancelTrip,
	deleteTrip,
	endTrip,
	leaveTrip,
	startTrip,
} from '@/servises/tripService';

export const creatorTripsOptionsActions = [
	'start',
	'complete',
	'delete',
	'cancel',
] as const;
export const joinedTripsOptionsActions = [
	'join',
	'leave',
	'Enter trip',
] as const;

export type ActionOption =
	| (typeof creatorTripsOptionsActions)[number]
	| (typeof joinedTripsOptionsActions)[number];

interface IUseTripOptions {
	tripId: string;
}

interface IUseTripOptionsReturn {
	handleActions: (action: ActionOption) => Promise<void>;
}

export default function useTripOption({
	tripId,
}: IUseTripOptions): IUseTripOptionsReturn {
	const nav = useNavigate();
	const { activate } = useAxios({
		manual: true,
	});

	const { getCreatedTripsData } = useTripShowcase();

	const handleActions = async (action: ActionOption) => {
		switch (action) {
			case 'join':
				nav(`${navigationRoutes.joinTrip}?tripId=${tripId}`);
				break;
			case 'start':
				await startTrip(activate, tripId);
				break;
			case 'complete':
				await endTrip(activate, tripId);
				break;
			case 'leave':
				await leaveTrip(activate, tripId);
				break;
			case 'cancel':
				await cancelTrip(activate, tripId);
				break;
			case 'delete':
				await deleteTrip(activate, tripId);
				break;
			case 'Enter trip':
				nav(`${navigationRoutes.map}?tripId=${tripId}`);
				break;
			default:
				throw new Error(`Action ${action} doesn't exist`);
		}

		await getCreatedTripsData();
	};

	return {
		handleActions,
	};
}
