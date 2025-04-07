import Icon from '@/components/icons/Icon';
import ScrollableMiddleWTopBottom from '@/components/ScrollableMiddleWTopBottom';
import Button from '@/components/ui/Button';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FormProvider, useForm } from 'react-hook-form';
import { Schemas, Types } from 'trip-track-package';
import { IUseFromStopsData } from './StopDetails';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import StopEditMode from './StopEditMode';
import { tripUpdate } from '@/servises/tripService';
import useAxios from '@/hooks/useAxios';
import { Trip } from '@/types/trip';

interface IEditDetailsStopsProps {
	trip: Trip;
}

export default function EditDetailsStops({ trip }: IEditDetailsStopsProps) {
	const { activate, status, error, loading } = useAxios({ manual: true });
	const { handleSubmit, ...reactHookFormsMethods } = useForm<IUseFromStopsData>(
		{
			resolver: zodResolver(Schemas.trip.multipleStepsTripSchema[1]),
		}
	);

	useEffect(() => {
		reactHookFormsMethods.setValue('stops', trip.stops);
	}, [trip]);

	const stopsFromFormState = reactHookFormsMethods.watch('stops');

	const stopsIds = useMemo(
		() =>
			stopsFromFormState?.map(
				(stop, i) => `${stop.location.lat}-${stop.location.lon}-${i}`
			) || [],
		[stopsFromFormState]
	);

	const onSubmit = async (newStopsData: IUseFromStopsData) => {
		await tripUpdate(activate, trip._id, newStopsData);
	};

	const handleDragEnd = ({ over, active }: DragEndEvent) => {
		if (!over) return;

		function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
			const newArray = [...array];
			const [movedItem] = newArray.splice(fromIndex, 1);
			newArray.splice(toIndex, 0, movedItem);
			return newArray;
		}

		const oldIndex = stopsFromFormState.findIndex(
			(s, i) => `${s.location.lat}-${s.location.lon}-${i}` === active.id
		);
		const newIndex = stopsFromFormState.findIndex(
			(s, i) => `${s.location.lat}-${s.location.lon}-${i}` === over.id
		);

		reactHookFormsMethods.setValue(
			'stops',
			arrayMove(stopsFromFormState, oldIndex, newIndex)
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
									{stopsFromFormState?.map((stop, i: number) => (
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
