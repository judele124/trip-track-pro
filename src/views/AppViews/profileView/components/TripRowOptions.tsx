import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { useRef } from 'react';
import { TripStatusArray } from 'trip-track-package';
import useTripOption, {
	creatorTripsOptionsActions,
	joinedTripsOptionsActions,
} from '../hooks/useTripOption';
import { useAuthContext } from '@/contexts/AuthContext';

const tripStatusToOptionMap: Record<
	(typeof TripStatusArray)[number],
	{
		creator: (typeof creatorTripsOptionsActions)[number][];
		participant: (typeof joinedTripsOptionsActions)[number][];
	}
> = {
	created: {
		creator: ['start', 'cancel'],
		participant: ['join', 'leave'],
	},
	started: {
		creator: ['complete'],
		participant: ['join', 'leave'],
	},
	completed: { creator: ['delete'], participant: [] },
	cancelled: { creator: ['delete'], participant: [] },
};

interface ITripRowOptions {
	trip: Trip;
	isCreator: boolean;
}

export default function TripRowOptions({ trip, isCreator }: ITripRowOptions) {
	const { isOpen, setIsOpen } = useToggle();
	const dotsRef = useRef<HTMLButtonElement>(null);
	const { user } = useAuthContext();
	const { handleActions } = useTripOption({
		tripId: trip._id,
	});

	const isAlreadyParticipant = trip.participants.some(
		(i) => i.userId.toString() === user?._id
	);

	return (
		<>
			<button
				ref={dotsRef}
				className='m-0 -mx-2 p-0 transition-all hover:scale-110'
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(true);
				}}
			>
				<Icon name='threeDots' />
			</button>

			<Modal
				anchorTo='right'
				anchorElement={dotsRef}
				backgroundClassname='bg-transparent backdrop-blur-none'
				onBackdropClick={() => setIsOpen(false)}
				open={isOpen}
			>
				<div className='flex w-56 flex-col gap-2 rounded-2xl border-2 border-primary bg-light p-4'>
					{[
						...(isCreator ? tripStatusToOptionMap[trip.status]['creator'] : []),
						...tripStatusToOptionMap[trip.status]['participant'],
					].map((o) => {
						if (
							(o === 'join' && isAlreadyParticipant) ||
							(o === 'leave' && !isAlreadyParticipant)
						) {
							return null;
						}

						return (
							<Button
								key={o}
								primary={o === 'start'}
								className={`w-full ${
									(o === 'cancel' && 'bg-red-500') ||
									(o === 'complete' && 'bg-green-500') ||
									''
								}`}
								onClick={() => handleActions(o)}
							>
								{o.charAt(0).toUpperCase() + o.substring(1)}
							</Button>
						);
					})}
				</div>
			</Modal>
		</>
	);
}
