import { Types } from 'trip-track-package';
import Button from './ui/Button';

interface TripDetailsProps {
	tripStops: Types['Trip']['Stop']['Model'][];
}

const TripDetailsStops = ({ tripStops }: TripDetailsProps) => {
	return (
		<div className='flex max-h-[585px] flex-col gap-4'>
			<div className='flex flex-col gap-2 overflow-y-auto'>
				{tripStops.map((stop: Types['Trip']['Stop']['Model']) => (
					<div
						key={stop.address}
						className='flex items-center justify-between gap-4 border-b-2 border-primary p-2'
					>
						<p className='truncate'>{stop.address}</p>
						{stop.experience && (
							<Button className='text-nowrap rounded-lg py-1' primary>
								show experience
							</Button>
						)}
					</div>
				))}
			</div>
			<Button>Edit</Button>
		</div>
	);
};

export default TripDetailsStops;
