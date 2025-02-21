import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import { Types } from 'trip-track-package';
import ExirienceModal from './ExperienceModal';

interface IStopMarkerProps {
	stop: Types['Trip']['Stop']['Model'];
}

export default function StopMarker({ stop }: IStopMarkerProps) {
	const { isOpen, toggle } = useToggle();

	return (
		<>
			<Button
				onClick={toggle}
				className={`relative flex max-w-60 -translate-y-12 items-center justify-between gap-4 bg-light text-dark dark:bg-dark dark:text-light ${!stop.experience ? 'cursor-default hover:bg-opacity-100' : ''}`}
			>
				<p className='overflow-hidden text-ellipsis whitespace-nowrap'>
					{stop.address}
				</p>
				{stop.experience && (
					<Icon className='fill-primary' name={stop.experience.type} />
				)}
				<svg
					className='absolute left-1/2 top-full size-5 -translate-x-1/2 fill-light dark:fill-dark'
					width='51'
					height='60'
					viewBox='0 0 51 60'
				>
					<path d='M50.75 0H0.75L27.2806 62L50.75 0Z' />
				</svg>
			</Button>
			{stop.experience && (
				<ExirienceModal
					open={isOpen}
					onBackdropClick={toggle}
					experience={stop.experience}
					type={stop.experience.type}
				/>
			)}
		</>
	);
}
