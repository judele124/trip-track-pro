import useAxios from '@/hooks/useAxios';
import { useTripShowcase } from '../components/TripsShowcase';
import { API_BASE_URL } from '@/env.config';

export const creatorTripsOptionsActions = [
	'start',
	'complete',
	'delete',
	'cancel',
] as const;
export const joinedTripsOptionsActions = ['join', 'leave'] as const;
type CreatorActions = typeof creatorTripsOptionsActions;
type ParticipantsActions = typeof creatorTripsOptionsActions;

type CreatorAction = CreatorActions[number];
type ParticipantAction = ParticipantsActions[number];

export type ActionOption = CreatorAction | ParticipantAction;

interface IUseTripOptions {
	tripId: string;
	isCreator: boolean;
}

interface IUseTripOptionsReturn {
	handleActions: (action: ActionOption) => Promise<void>;
	allowedActions:
		| typeof creatorTripsOptionsActions
		| typeof joinedTripsOptionsActions;
}

export default function useTripOption({
	tripId,
	isCreator,
}: IUseTripOptions): IUseTripOptionsReturn {
	const { activate } = useAxios({
		manual: true,
	});
	const { getCreatedTripsData } = useTripShowcase();

	const handleActions = async (action: ActionOption) => {
		if (!isCreator) {
			throw new Error(`You are not authorized to perform the ${action} action`);
		}
		switch (action) {
			case 'start':
				await activate({
					method: 'POST',
					url: `${API_BASE_URL}/trip/start/${tripId}`,
				});
				break;
			case 'complete':
				await activate({
					method: 'POST',
					url: `${API_BASE_URL}/trip/end/${tripId}`,
				});

				break;
			case 'cancel':
				// TODO:
				// create a cancel route in be and then call it here
				alert('functionality is not active yet');
				break;
			case 'delete':
				// TODO:
				// create a delete route in be and then call it here
				alert('functionality is not active yet');
				break;
			default:
				break;
		}

		await getCreatedTripsData();
	};

	return {
		handleActions,
		allowedActions: isCreator
			? creatorTripsOptionsActions
			: joinedTripsOptionsActions,
	};
}
