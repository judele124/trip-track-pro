import Icon, { IconName } from './icons/Icon';
import useToggle from '@/hooks/useToggle';
import Modal from './ui/Modal';
import { Types } from 'trip-track-package';
import { useFormContext } from 'react-hook-form';
import StopLocationInput from '@/views/AppViews/createTripView/components/stage2/StopLocationInput';
import Button from './ui/Button';
import { useEffect } from 'react';
import ExperienceForm from '@/views/AppViews/createTripView/components/stage2/ExperienceForm';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
	if (editMode) {
		return <StopEditMode index={index} stop={stop} />;
	}

	return (
		<div className='relative flex h-12 w-full items-center justify-start gap-2 rounded-2xl border-2 border-primary'>
			{/* icon */}
			<i
				className={`ml-2 w-8 ${editMode || icon === 'circle' ? 'scale-75' : ''}`}
			>
				<Icon name={!editMode ? icon : 'grid-dots'} className='fill-primary' />
			</i>

			{/* address */}
			<p className='overflow-hidden text-ellipsis text-nowrap'>
				{stop.address || 'No address found'}
			</p>

			{/* experience button */}
			{stop.experience && (
				<div className='absolute bottom-0 right-0 top-0 flex gap-2 py-1.5 pr-1.5'>
					<Button
						className='flex items-center justify-center gap-1 rounded-xl py-1 text-sm font-semibold'
						type='button'
						primary
					>
						{`${stop.experience.type.charAt(0).toUpperCase()}${stop.experience.type.substring(1)}`}
						<i>
							<Icon
								name={stop.experience.type}
								size='18'
								className='fill-white'
							/>
						</i>
					</Button>
				</div>
			)}
		</div>
	);
};

export default StopDetails;

interface IStopEditMode {
	index: number;
	stop: Types['Trip']['Stop']['Model'];
}

function StopEditMode({ stop, index }: IStopEditMode) {
	const { setValue, watch } = useFormContext<IUseFromStopsData>();
	const { isOpen, toggle: toggleExperienceModal } = useToggle();
	const { setNodeRef, attributes, transform, transition, listeners } =
		useSortable({
			id: index,
		});

	useEffect(() => {
		if (!stop?.experience) return;
		setValue(`stops.${index}`, stop);
	}, [stop]);

	const handleInputOnValueChange = (
		stop: Types['Trip']['Stop']['Model'] | undefined
	) => {
		if (!stop) return;
		setValue(`stops.${index}.address`, stop.address);
		setValue(`stops.${index}.location`, stop.location);
	};

	const handleOnEditExperience = () => toggleExperienceModal();

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} className='relative w-full'>
			<StopLocationInput
				icon='grid-dots'
				textContent={watch(`stops.${index}.address`) || stop.address}
				title='Stop Location'
				className='h-12'
				onValueChange={handleInputOnValueChange}
				triggerElementIconAttributes={{
					...listeners,
					...attributes,
				}}
			/>

			{/* experience button */}
			<div className='absolute bottom-0 right-0 top-0 flex gap-2 py-2 pr-2'>
				<Button
					className='flex items-center justify-center gap-1 rounded-xl py-1 text-sm font-semibold'
					type='button'
					onClick={handleOnEditExperience}
					primary
				>
					{stop.experience
						? `${stop.experience.type.charAt(0).toUpperCase()}${stop.experience.type.substring(1)}`
						: 'Add Experience'}
					<i>
						<Icon
							name={stop.experience?.type || 'plus'}
							size='18'
							className='fill-white'
						/>
					</i>
				</Button>
			</div>
			<Modal open={isOpen} onBackdropClick={toggleExperienceModal} center>
				<ExperienceForm
					onCencel={() => toggleExperienceModal()}
					onConfirm={() => toggleExperienceModal()}
					index={index}
				/>
			</Modal>
		</div>
	);
}
