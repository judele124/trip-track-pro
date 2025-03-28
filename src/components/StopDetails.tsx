import Icon, { IconName } from './icons/Icon';
import useToggle from '@/hooks/useToggle';
import Modal from './ui/Modal';
import { Types, ExperienceType } from 'trip-track-package';
import { useFormContext } from 'react-hook-form';
import StopLocationInput from '@/views/AppViews/createTripView/components/stage2/StopLocationInput';
import Button from './ui/Button';
import { useEffect } from 'react';
import ExperienceForm from '@/views/AppViews/createTripView/components/stage2/ExperienceForm';

interface IStopDetailsProps {
	stop: Types['Trip']['Stop']['Model'];
	icon: IconName;
	editMode?: boolean;
	index: number;
}

export interface IUseFromStopsData {
	stops: Types['Trip']['Stop']['Model'][];
}
const StopDetails = ({ stop, icon, editMode, index }: IStopDetailsProps) => {
	const { isOpen, toggle } = useToggle();
	const { setValue, watch } = useFormContext<IUseFromStopsData>();

	useEffect(() => {
		if (stop.experience) {
			setValue(`stops.${index}`, stop);
		}
	}, [stop]);

	console.log('reactHookFormsMethods', watch());

	return (
		<>
			<div
				key={stop.address || 'No address found'}
				className='flex w-full justify-start gap-2 rounded-2xl py-2'
			>
				<i className={`mt-2 w-8 ${icon === 'circle' ? 'scale-75' : ''}`}>
					<Icon name={icon} className='fill-primary' />
				</i>

				<div className='flex flex-col items-start gap-2'>
					{!editMode ? (
						<p className='font-semibold'>
							{stop.address || 'No address found'}
						</p>
					) : (
						<StopLocationInput
							textContent={watch(`stops.${index}.address`) || stop.address}
							title='Stop Location'
							onValueChange={(stop) => {
								if (!stop) return;
								setValue(`stops.${index}.address`, stop.address);
								setValue(`stops.${index}.location`, stop.location);
							}}
						/>
					)}
					{stop.experience && (
						<Button
							type='button'
							onClick={() => {
								if (!editMode) return;
								toggle();
							}}
							className={`flex items-center justify-center gap-2 rounded-lg py-1`}
							primary
						>
							<p className='text-white dark:text-dark'>
								{stop.experience.type}
							</p>
							<IconType type={stop.experience.type} />
						</Button>
					)}
				</div>
			</div>
			<Modal open={isOpen} onBackdropClick={toggle} center>
				<ExperienceForm
					onCencel={() => toggle()}
					onConfirm={() => toggle()}
					index={index}
				/>
			</Modal>
		</>
	);
};

export default StopDetails;

export function IconType({ type }: { type: ExperienceType }) {
	return (
		<div>
			<Icon size='20' className='fill-white dark:fill-dark' name={type} />
		</div>
	);
}
