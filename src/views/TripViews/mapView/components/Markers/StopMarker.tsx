import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import { Types } from 'trip-track-package';
import ExirienceModal from '../ExperienceModal';
import Modal from '@/components/ui/Modal';
import { forwardRef } from 'react';

interface IStopMarkerProps {
	stop: Types['Trip']['Stop']['Model'];
	disableExperience?: true;
	index: number;
}

export default forwardRef<HTMLButtonElement, IStopMarkerProps>(
	function StopMarker({ stop, disableExperience, index }, ref) {
		const { isOpen, toggle } = useToggle();

		return (
			<>
				<Button
					ref={ref}
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
					<>
						{disableExperience && (
							<Modal onBackdropClick={toggle} center open={isOpen}>
								<div className='page-colors w-72 rounded-2xl px-6 py-5 text-center'>
									<h4>Experience is available only when the trip is live</h4>
								</div>
							</Modal>
						)}
						{!disableExperience && (
							<ExirienceModal
								open={isOpen}
								onBackdropClick={toggle}
								experience={stop.experience}
								type={stop.experience.type}
								index={index}
							/>
						)}
					</>
				)}
			</>
		);
	}
);
