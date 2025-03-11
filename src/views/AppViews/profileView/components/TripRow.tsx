import Icon from '@/components/icons/Icon';
import { Trip } from '@/types/trip';
import TripStatusButton from './TripStatusButton';
import { Types } from 'trip-track-package';

interface TripRowProps {
	trip: Trip;
	i: number;
	setIsOpen: (isOpen: boolean) => void;
}

export default function TripRow({ trip, i, setIsOpen }: TripRowProps) {
	return (
		<div
			key={i}
			className={`flex items-center rounded-2xl border-2 border-primary bg-white px-4 py-2 dark:bg-dark`}
		>
			<div className='w-[50%]'>
				<h5 className='-mb-1'>{trip.name}</h5>
				<div className='flex items-center justify-start gap-1'>
					<AddressOrLocation stop={trip.stops[0]} />
					<span>to</span>
					<AddressOrLocation stop={trip.stops[trip.stops.length - 1]} />
				</div>
			</div>

			<div className='flex w-[50%] items-center justify-between gap-2 pl-2'>
				<TripStatusButton status={trip.status} />
				{trip.reward && <span className='text-lg'>🏆</span>}
				<button
					className='m-0 -mx-2 p-0 transition-all hover:scale-110'
					onClick={() => setIsOpen(true)}
				>
					<Icon name='threeDots' />
				</button>
			</div>
		</div>
	);
}

function AddressOrLocation({ stop }: { stop: Types['Trip']['Stop']['Model'] }) {
	return stop.address ? (
		<p
			title={stop.address}
			className='overflow-hidden text-ellipsis whitespace-nowrap text-sm'
		>
			{stop.address}
		</p>
	) : (
		<p
			title={`${stop.location.lon}-${stop.location.lat}`}
			className='overflow-hidden text-ellipsis whitespace-nowrap text-sm'
		>
			{stop.location.lon}-{stop.location.lat}
		</p>
	);
}
