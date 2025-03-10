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
			className={`flex items-center rounded-2xl border-2 border-primary bg-white px-2 py-3 dark:bg-dark`}
		>
			<p className='w-[45%]'>{trip.name}</p>
			<div className='flex w-[55%] items-center justify-between'>
				<TripStatusButton status={trip.status} />
				{trip.reward && <span>🏆</span>}
				<button className='m-0 cursor-help p-0' onClick={() => setIsOpen(true)}>
					<Icon name='threeDots' />
				</button>
			</div>
		</div>
	);
}
