import Icon from './icons/Icon';
import useToggle from '@/hooks/useToggle';
import { Schemas, Types } from 'trip-track-package';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './ui/Button';
import StopDetails, { IUseFromStopsData } from './StopDetails';
import { useRef, useState } from 'react';
import Modal from './ui/Modal';

interface ITripDetailsProps {
	tripStops: Types['Trip']['Stop']['Model'][];
	isCreator?: boolean;
}

const TripDetailsStops = ({ tripStops }: ITripDetailsProps) => {
	const { isOpen: editMode, toggle: toggleEditMode } = useToggle();
	const { isOpen: addStopIsOpen, toggle: toggleAddStop } = useToggle();
	const [stops, setStops] = useState<ITripDetailsProps['tripStops']>(
		tripStops || []
	);
	const { handleSubmit, ...reactHookFormsMethods } = useForm<IUseFromStopsData>(
		{
			resolver: zodResolver(Schemas.trip.multipleStepsTripSchema[1]),
		}
	);
	const onSubmit = (data: IUseFromStopsData) => {
		reactHookFormsMethods.reset(data);
	};

	const handleAddStop = (
		index: number,
		stop: Types['Trip']['Stop']['Model']
	) => {
		console.log('index', index);

		const newStops = [...stops];
		newStops.splice(index, 0, stop);
		setStops(newStops);
	};

	return (
		<FormProvider handleSubmit={handleSubmit} {...reactHookFormsMethods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex items-center gap-2'>
					<h3>Stops</h3>
					{
						<Button
							type={`${!editMode ? 'submit' : 'button'}`}
							onClick={toggleEditMode}
							className={`flex rounded-xl py-1`}
							primary
						>
							{!editMode ? 'Edit' : 'Done'}
							<Icon size='20' className='ml-2' name='edit' />
						</Button>
					}
				</div>
				<div className='flex max-h-[50vh] flex-col gap-2 overflow-y-auto overflow-x-hidden'>
					{stops.map((stop, i: number) => (
						<div
							key={i + stop.location.lon}
							className='flex flex-col items-center gap-2'
						>
							<StopDetails
								index={i}
								key={`${stop.location.lon} + ${stop.location.lat}`}
								stop={stop}
								icon={
									(i == 0 && 'location') ||
									(i == stops.length - 1 && 'flag') ||
									'circle'
								}
								editMode={editMode}
							/>
							{i == stops.length - 2 && editMode && (
								<Button onClick={toggleAddStop} className='-ml-2 w-[73%]'>
									add
								</Button>
							)}
						</div>
					))}
				</div>
			</form>
			<Modal open={addStopIsOpen} onBackdropClick={toggleAddStop} center>
				<ChousePlace
					tripStops={stops}
					onAddStop={(selected) => {
						toggleAddStop();
						handleAddStop(
							selected,
							Schemas.trip.StopSchema.parse({
								location: {
									lat: Date.now(),
									lon: Date.now(),
								},
								address: 'loo',
								experience: {
									type: 'info',
									data: {
										text: 'lllll',
									},
								},
							})
						);
					}}
				/>
			</Modal>
		</FormProvider>
	);
};

export default TripDetailsStops;

const ChousePlace = ({
	tripStops: stops,
	onAddStop,
}: ITripDetailsProps & { onAddStop: (e: number) => void }) => {
	const [selected, setSelected] = useState<number | null>(stops.length - 1);

	return (
		<div className='page-colors page-padding m-3 flex flex-col gap-3 rounded-lg'>
			<h3>choose index</h3>
			<div className='flex flex-wrap gap-2 transition-all duration-300'>
				{Array.from({ length: stops.length + 1 }).map((_, i) => (
					<label
						key={i + 'stop'}
						className='flex cursor-pointer items-center gap-2 transition-transform duration-500'
					>
						<input
							type='radio'
							onChange={() => setSelected(i)}
							className='hidden'
						/>
						<div
							className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-500 ${
								selected === i
									? 'border-primary shadow-[0_0_0_3px] shadow-primary/50'
									: 'border-gray-400 bg-gray-200'
							}`}
						>
							<span
								className={`text-sm ${selected === i ? 'absolute z-10' : ''}`}
							>
								{i + 1}
							</span>
						</div>
					</label>
				))}
			</div>
			<Button
				className='h-10 py-0'
				onClick={() => {
					if (selected !== null) {
						onAddStop(selected);
						setSelected(stops.length);
					}
				}}
			>
				submit
			</Button>
		</div>
	);
};
