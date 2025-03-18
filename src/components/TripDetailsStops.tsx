import { ExperienceType, Types } from 'trip-track-package';
import Button from './ui/Button';
import Icon, { IconName } from './icons/Icon';
import useToggle from '@/hooks/useToggle';

interface TripDetailsProps {
	tripStops: Types['Trip']['Stop']['Model'][];
	isCreator?: boolean;
}

const TripDetailsStops = ({ tripStops, isCreator }: TripDetailsProps) => {
	return (
		<div>
			<h3>Stops</h3>
			<div className='flex flex-col gap-2 overflow-y-auto overflow-x-hidden'>
				{tripStops.map((stop: Types['Trip']['Stop']['Model'], i) => (
					<StopDetails
						isCreator={isCreator}
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
		</div>
	);
};

export default TripDetailsStops;

interface IStopDetailsProps {
	stop: Types['Trip']['Stop']['Model'];
	icon: IconName;
	isCreator?: boolean;
}

function StopDetails({ stop, icon, isCreator }: IStopDetailsProps) {
	const { isOpen: editMode, toggle: toggleEditMode } = useToggle();
	return (
		<div
			key={stop.address || 'No address found'}
			className='flex w-full justify-start gap-2 rounded-2xl py-2'
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

			{isCreator && (
				<button className='-mr-4 ml-auto' onClick={() => toggleEditMode()}>
					<Icon name='threeDots' />
				</button>
			)}
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
