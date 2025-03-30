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

const tripStatusToOptionMap: Record<
	(typeof TripStatusArray)[number],
	(
		| typeof creatorTripsOptionsActions
		| typeof joinedTripsOptionsActions
	)[number][]
> = {
	created: ['start', 'cancel', 'join', 'leave'],
	started: ['complete', 'join', 'leave'],
	completed: ['delete'],
	cancelled: ['delete'],
};

interface ITripRowOptions {
	trip: Trip;
	isCreator: boolean;
}

export default function TripRowOptions({ trip, isCreator }: ITripRowOptions) {
	const { isOpen, setIsOpen } = useToggle();
	const dotsRef = useRef<HTMLButtonElement>(null);

	const { handleActions, allowedActions } = useTripOption({
		tripId: trip._id,
		isCreator,
	});

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
					{tripStatusToOptionMap[trip.status].map((option) => (
						<Button
							key={option}
							primary={option === 'start'}
							className={`w-full ${
								(option === 'cancel' && 'bg-red-500') ||
								(option === 'complete' && 'bg-green-500') ||
								''
							}`}
							onClick={() => handleActions(option)}
						>
							{option.charAt(0).toUpperCase() + option.substring(1)}
						</Button>
					))}
				</div>
			</Modal>
		</>
	);
}
