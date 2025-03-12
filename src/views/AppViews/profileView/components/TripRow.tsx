import Icon from '@/components/icons/Icon';
import { Trip } from '@/types/trip';
import TripStatusButton from './TripStatusButton';
import { Types } from 'trip-track-package';
import { Link, useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';

interface TripRowProps {
	trip: Trip;
	i: number;
	setIsOpen: (isOpen: boolean) => void;
}

export default function TripRow({ trip, i, setIsOpen }: TripRowProps) {
	const nav = useNavigate();
	return (
		<button
			onClick={() => nav(`${navigationRoutes.tripDetails}/${trip._id}`)}
			key={i}
			className={`flex items-center rounded-2xl border-2 border-primary bg-white px-4 py-2 text-left hover:bg-opacity-50 dark:bg-secondary dark:hover:bg-opacity-50`}
		>
			<div className='w-[50%]'>
				<h5 className='-mb-1'>
					{trip.name[0].toUpperCase() + trip.name.slice(1)}
				</h5>
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
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(true);
					}}
				>
					<Icon name='threeDots' />
				</button>
			</div>
		</button>
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
