import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import { Types } from 'trip-track-package';

interface IStopMarkerProps {
	stop: Types['Trip']['Stop']['Model'];
}

export default function StopMarker({ stop }: IStopMarkerProps) {
	const { isOpen, toggle } = useToggle();

	console.log(stop);

	return (
		<>
			<Button
				onClick={toggle}
				className='relative flex max-w-60 -translate-y-12 items-center justify-between gap-4 bg-light text-dark dark:bg-dark dark:text-light'
			>
				<p className='overflow-hidden text-ellipsis whitespace-nowrap'>
					{stop.address}
				</p>
				{stop.experience && (
					<Icon className='fill-primary' name={stop.experience.type} />
				)}
				<svg
					className='absolute left-1/2 top-full size-5 -translate-x-1/2 fill-dark'
					width='51'
					height='60'
					viewBox='0 0 51 60'
				>
					<path d='M50.75 0H0.75L27.2806 62L50.75 0Z' />
				</svg>
			</Button>
			<ExirienceModal open={isOpen} onBackdropClick={toggle} />
		</>
	);
}

interface IExirienceModalProps {
	open: boolean;
	onBackdropClick: () => void;
}

const ExirienceModal = ({ open, onBackdropClick }: IExirienceModalProps) => {
	return (
		<Modal center open={open} onBackdropClick={onBackdropClick}>
			<div className='size-52 bg-red-500'></div>
		</Modal>
	);
};
