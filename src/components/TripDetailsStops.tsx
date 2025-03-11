import { ExperienceType, Types } from 'trip-track-package';
import Button from './ui/Button';
import Icon, { IconName } from './icons/Icon';

interface TripDetailsProps {
	tripStops: Types['Trip']['Stop']['Model'][];
}

const TripDetailsStops = ({ tripStops }: TripDetailsProps) => {
	return (
		<div className='flex max-h-[585px] flex-col gap-4'>
			<div className='flex flex-col gap-2 overflow-y-auto'>
				{tripStops.map((stop: Types['Trip']['Stop']['Model'], i) => (
					<StopDetails
						key={`${stop.location.lon} + ${stop.location.lat}`}
						stop={stop}
						icon={
							(i == 0 && 'location') ||
							(i == tripStops.length - 1 && 'flag') ||
							'circle'
						}
					/>
				))}
			</div>
			<Button>Edit</Button>
		</div>
	);
};

export default TripDetailsStops;

interface IStopDetailsProps {
	stop: Types['Trip']['Stop']['Model'];
	icon: IconName;
}

function StopDetails({ stop, icon }: IStopDetailsProps) {
	return (
		<div
			key={stop.address || 'No address found'}
			className='flex justify-start gap-2 rounded-2xl py-2'
		>
			<i className={`mt-2 w-8 ${icon === 'circle' ? 'scale-75' : ''}`}>
				<Icon name={icon} className='fill-primary' />
			</i>

			<div className='flex flex-col items-start gap-2'>
				<p className='font-semibold'>{stop.address || 'No address found'}</p>
				<p className='text-xs opacity-75'>{`${stop.location.lon}-${stop.location.lat}`}</p>
				{stop.experience && (
					<Button
						className='flex items-center justify-center gap-2 rounded-lg py-1'
						primary
					>
						<p className='text-white dark:text-dark'>{stop.experience.type}</p>
						<IconType type={stop.experience.type} />
					</Button>
				)}
			</div>
		</div>
	);

	function IconType({ type }: { type: ExperienceType }) {
		return (
			<div>
				<Icon size='20' className='fill-white dark:fill-dark' name={type} />
			</div>
		);
	}
}
