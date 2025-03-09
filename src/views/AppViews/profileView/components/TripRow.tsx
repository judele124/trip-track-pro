import Icon from '@/components/icons/Icon';
import { Trip } from '@/types/trip';
import TripStatusButton from './TripStatusButton';

interface TripRowProps {
	trip: Trip;
	i: number;
	setIsOpen: (isOpen: boolean) => void;
}

export default function TripRow({ trip, i, setIsOpen }: TripRowProps) {
	return (
		<div
			key={i}
			className={`flex w-full flex-row justify-between rounded-2xl border-2 border-primary bg-light px-2 py-3 dark:bg-dark`}
			style={{ position: 'sticky', top: 0, zIndex: 10 + i }}
		>
			<p className='w-[45%]'>{trip.name}</p>
			<Icon name={trip.reward ? 'vIcon' : 'xIcon'} />
			<TripStatusButton status={trip.status} />
			<button className='m-0 cursor-help p-0' onClick={() => setIsOpen(true)}>
				<Icon name='threeDots' />
			</button>
		</div>
	);
}
