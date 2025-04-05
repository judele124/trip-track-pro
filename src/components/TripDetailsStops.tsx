import Icon from './icons/Icon';
import useToggle from '@/hooks/useToggle';
import { Schemas, Types } from 'trip-track-package';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './ui/Button';
import StopDetails, { IUseFromStopsData } from './StopDetails';
import { useEffect, useMemo, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface ITripDetailsProps {
	tripStops: Types['Trip']['Stop']['Model'][];
	isCreator?: boolean;
}

const TripDetailsStops = ({ tripStops }: ITripDetailsProps) => {
	const { isOpen: editMode, toggle: toggleEditMode } = useToggle();
	const [stops, setStops] = useState<ITripDetailsProps['tripStops']>(
		tripStops || []
	);

	const { handleSubmit, ...reactHookFormsMethods } = useForm<IUseFromStopsData>(
		{
			resolver: zodResolver(Schemas.trip.multipleStepsTripSchema[1]),
		}
	);

	useEffect(() => {
		reactHookFormsMethods.setValue('stops', stops);
	}, [stops]);

	const tripIds = useMemo(() => stops.map((_, i) => i), [stops]);

	console.log(reactHookFormsMethods.watch());
	console.log(reactHookFormsMethods.formState.errors);

	const onSubmit = (data: IUseFromStopsData) => {
		console.log(data);
	};

	const handleDragEnd = ({ over, active }: DragEndEvent) => {
		setStops((prevStops) => {
			if (!over) return prevStops;

			const oldIndex = prevStops.findIndex((_, i) => i === active.id);
			const newIndex = prevStops.findIndex((_, i) => i === over.id);
			return arrayMove(prevStops, oldIndex, newIndex);
		});
	};

	const handleAddStop = () => {
		setStops((prev) => [...prev, prev[prev.length - 1]]);
	};

	return (
		<FormProvider handleSubmit={handleSubmit} {...reactHookFormsMethods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-2 flex items-start justify-between'>
					<h4>Stops</h4>

					{/* edit button */}
					<Button
						type={editMode ? 'submit' : 'button'}
						onClick={editMode ? () => null : toggleEditMode}
						className='flex justify-center gap-1 rounded-md px-2 py-1 text-sm font-normal text-white dark:text-dark'
					>
						{!editMode ? 'Edit' : 'Done'}
						<i>
							<Icon
								size='17'
								className='-mb-1 fill-white dark:fill-dark'
								name='edit'
							/>
						</i>
					</Button>
				</div>

				{/* stops */}
				<div className='flex max-h-[50vh] flex-col gap-2 overflow-y-auto overflow-x-hidden'>
					<DndContext
						modifiers={[restrictToVerticalAxis]}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							strategy={verticalListSortingStrategy}
							items={tripIds}
						>
							{stops.map((stop, i: number) => (
								<StopDetails
									index={i}
									key={`${stop.location.lon}-${stop.location.lat}-${i}`}
									stop={stop}
									icon={
										(i == 0 && 'location') ||
										(i == stops.length - 1 && 'flag') ||
										'circle'
									}
									editMode={editMode}
								/>
							))}
						</SortableContext>
					</DndContext>
					{editMode && <Button onClick={handleAddStop}>add stop</Button>}
				</div>
			</form>
		</FormProvider>
	);
};

export default TripDetailsStops;
