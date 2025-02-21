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
		<div>
			<p>{data.text}</p>
			<Button onClick={onClose}>Close</Button>
		</div>
	);
}
