import { Types } from 'trip-track-package';

interface InfoExperienceDataProps {
	info: Types['Trip']['Stop']['Experience']['Details']['Info']['Model']['data']['text'];
}

export default function InfoExperienceData({ info }: InfoExperienceDataProps) {
	return <div>{info}</div>;
}
