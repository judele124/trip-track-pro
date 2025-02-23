import Button from '@/components/ui/Button';
import { Types } from 'trip-track-package';

interface InfoExperienceDataProps {
	data: Types['Trip']['Stop']['Experience']['Details']['Info']['Model']['data'];
	onClose: () => void;
}

export default function InfoExperienceData({
	data,
	onClose,
}: InfoExperienceDataProps) {
	return (
		<div className='flex flex-col gap-2'>
			<p>{data.text}</p>
			<Button className='w-full' onClick={onClose}>
				Close
			</Button>
		</div>
	);
}
