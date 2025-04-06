import Icon from '@/components/icons/Icon';
import ScrollableMiddleWTopBottom from '@/components/ScrollableMiddleWTopBottom';
import Button from '@/components/ui/Button';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FormProvider, useForm } from 'react-hook-form';
import { Schemas, Types } from 'trip-track-package';
import StopDetails, { IUseFromStopsData } from './StopDetails';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import StopEditMode from './StopEditMode';

interface IEditDetailsStopsProps {
	stops: Types['Trip']['Stop']['Model'][];
}
export default function EditDetailsStops({ stops }: IEditDetailsStopsProps) {
	const { handleSubmit, ...reactHookFormsMethods } = useForm<IUseFromStopsData>(
		{
			resolver: zodResolver(Schemas.trip.multipleStepsTripSchema[1]),
		}
	);

	useEffect(() => {
		reactHookFormsMethods.setValue('stops', stops);
	}, [stops]);

	const stopsIds = useMemo(() => stops.map((_, i) => i), [stops]);

	const onSubmit = async (data: IUseFromStopsData) => {
		console.log('update submited', data);
	};

	const handleDragEnd = ({ over, active }: DragEndEvent) => {
		if (!over) return;

		const oldIndex = stops.findIndex((_, i) => i === active.id);
		const newIndex = stops.findIndex((_, i) => i === over.id);
		console.log(oldIndex, newIndex);

		reactHookFormsMethods.setValue(
			'stops',
			arrayMove(stops, oldIndex, newIndex)
		);
	};

	const handleAddStop = () => {
		const currentStops = reactHookFormsMethods.watch('stops');

		reactHookFormsMethods.setValue('stops', [
			...currentStops,
			currentStops[currentStops.length - 1],
		]);
	};

	return (
		<FormProvider handleSubmit={handleSubmit} {...reactHookFormsMethods}>
			<form
				className='flex grow flex-col overflow-visible'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='mb-2 flex items-start justify-between'>
					<h4>Stops</h4>

					{/* edit button */}
					<Button
						type='submit'
						className='flex justify-center gap-1 rounded-md px-2 py-1 text-sm font-normal text-white dark:text-dark'
					>
						Submit
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
				<DndContext
					modifiers={[restrictToVerticalAxis]}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						strategy={verticalListSortingStrategy}
						items={stopsIds}
					>
						<ScrollableMiddleWTopBottom
							top={null}
							middle={
								<div className='flex flex-col gap-2 overflow-x-clip overflow-y-visible'>
									{stops.map((stop, i: number) => (
										<StopEditMode
											key={`${stop.location.lat}-${stop.location.lon}-${i}`}
											index={i}
											stop={stop}
										/>
									))}
								</div>
							}
							bottom={
								<Button className='mt-2 w-full' onClick={handleAddStop}>
									add stop
								</Button>
							}
						/>
					</SortableContext>
				</DndContext>
			</form>
		</FormProvider>
	);
}
