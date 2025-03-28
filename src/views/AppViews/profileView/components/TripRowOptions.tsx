import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { API_BASE_URL } from '@/env.config';
import useAxios from '@/hooks/useAxios';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { useRef } from 'react';
import { TripStatusArray } from 'trip-track-package';
import { useTripShowcase } from './TripsShowcase';

const options = ['start', 'complete', 'delete', 'cancel'] as const;

const tripStatusToOptionMap: Record<
	(typeof TripStatusArray)[number],
	(typeof options)[number][]
> = {
	created: ['start', 'cancel'],
	started: ['complete'],
	completed: ['delete'],
	cancelled: ['delete'],
};

interface ITripRowOptions {
	trip: Trip;
}

export default function TripRowOptions({ trip }: ITripRowOptions) {
	const { isOpen, setIsOpen } = useToggle();
	const dotsRef = useRef<HTMLButtonElement>(null);
	const { activate } = useAxios({
		manual: true,
	});
	const { getCreatedTripsData } = useTripShowcase();

	const handleActions = async (action: (typeof options)[number]) => {
		switch (action) {
			case 'start':
				await activate({
					method: 'POST',
					url: `${API_BASE_URL}/trip/start/${trip._id}`,
				});
				break;
			case 'complete':
				await activate({
					method: 'POST',
					url: `${API_BASE_URL}/trip/end/${trip._id}`,
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
