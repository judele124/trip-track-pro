import { FormProvider, useForm } from 'react-hook-form';
import { Types } from 'trip-track-package';
import StopInput from '../../createTripView/components/stage2/StopInput';
import Button from '@/components/ui/Button';

interface IEditStopsProps {
	stops: Types['Trip']['Stop']['Model'][];
	toggleEditMode: () => void;
}

export default function EditStops({
	stops: initialStops,
	toggleEditMode,
}: IEditStopsProps) {
	const methods = useForm({
		defaultValues: {
			stops: initialStops,
		},
	});

	const stops = methods.watch('stops');

	return (
		<>
			<FormProvider {...methods}>
				{stops.map((_, i) => (
					<StopInput
						key={i}
						index={i}
						isMiddleStop={i != 0 && i != stops.length - 1}
					/>
				))}
			</FormProvider>
			<div className='flex items-center gap-1'>
				<Button className='w-full bg-red-500' onClick={toggleEditMode}>
					Cancel
				</Button>
				<Button className='w-full bg-green-500' onClick={() => {}}>
					Submit
				</Button>
			</div>
		</>
	);
}
