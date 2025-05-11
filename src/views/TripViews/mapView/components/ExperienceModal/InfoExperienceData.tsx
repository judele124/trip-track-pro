import Button from '@/components/ui/Button';
import { useEffect } from 'react';
import { Types } from 'trip-track-package';

interface InfoExperienceDataProps {
	infoExpData: Types['Trip']['Stop']['Experience']['Details']['Info']['Model'];
	onClose: () => void;
	finishExperience: (score: number) => void;
}

export default function InfoExperienceData({
	infoExpData: { data, score = 0 },
	onClose,
	finishExperience,
}: InfoExperienceDataProps) {
	useEffect(() => {
		finishExperience(score);
	}, []);

	return (
		<div className='flex flex-col gap-2'>
			<p>{data.text}</p>
			<Button className='w-full' onClick={onClose}>
				Close
			</Button>
		</div>
	);
}
