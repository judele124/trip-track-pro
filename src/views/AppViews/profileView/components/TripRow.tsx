import Icon from '@/components/icons/Icon';
import { Trip } from '@/types/trip';
import TripStatusButton from './TripStatusButton';

interface TripRowProps {
	trip: Trip;
	i: number;
	setIsOpen: (isOpen: boolean) => void;
}

export default function TripRow({ trip, i, setIsOpen }: TripRowProps) {
	if (trip.name == 'test mongo id') {
		console.log(trip);
	}

	return (
		<div
			key={i}
			className={`flex items-center rounded-2xl border-2 border-primary bg-white px-4 py-2 dark:bg-dark`}
		>
			<div className='w-[55%]'>
				<h4>{trip.name}</h4>
				<div className='flex gap-1'>
					<p className='overflow-hidden text-ellipsis whitespace-nowrap'>
						{trip.stops[0].address ||
							`${trip.stops[0].location.lon}-${trip.stops[0].location.lat}`}
					</p>
					<span>to</span>
					<p className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
						{trip.stops[trip.stops.length - 1].address ||
							`${trip.stops[trip.stops.length - 1].location.lon}-${trip.stops[trip.stops.length - 1].location.lat}`}
					</p>
				</div>
			</div>

			<div className='flex w-[45%] items-center justify-between pl-2'>
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
