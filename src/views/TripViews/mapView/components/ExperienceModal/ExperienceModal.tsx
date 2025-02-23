import Icon from '@/components/icons/Icon';
import Modal from '@/components/ui/Modal';
import { ExperienceType, Types } from 'trip-track-package';
import InfoExperienceData from './InfoExperienceData';
import TriviaExperienceData from './TriviaExperienceData';

interface IExperienceModalProps {
	open: boolean;
	onBackdropClick: () => void;
	experience: Types['Trip']['Stop']['Experience']['Model'];
	type: Types['Trip']['Stop']['Experience']['Model']['type'];
}

export default function ExirienceModal({
	open,
	onBackdropClick,
	experience,
}: IExperienceModalProps) {
	return (
		<Modal center open={open} onBackdropClick={onBackdropClick}>
			<div className='page-colors w-[95vw] max-w-[400px] rounded-lg bg-light p-6 dark:bg-dark'>
				<div className='mb-4 flex gap-2'>
					<i>
						<Icon className='size-8 fill-primary' name={experience.type} />
					</i>
					<h3 className='text-xl font-semibold'>{experience.type}</h3>
				</div>
				{experience.type === ExperienceType.INFO && (
					<InfoExperienceData
						data={experience.data}
						onClose={onBackdropClick}
					/>
				)}
				{experience.type === ExperienceType.TRIVIA && (
					<TriviaExperienceData
						data={experience.data}
						onClose={onBackdropClick}
					/>
				)}
			</div>
		</Modal>
	);
}
