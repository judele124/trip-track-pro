import { DirectionStep } from '@/types/map';
import GeneralMarker from './GeneralMarker';

interface IStepMarkerProps {
	step: DirectionStep;
}

export default function StepMarker({ step }: IStepMarkerProps) {
	const [lon, lat] = step.maneuver.location;

	return (
		<GeneralMarker
			childrenAsInnerHtmlString={`<div class='p-2 rounded-2xl page-colors'>
				<p>${step.maneuver.instruction}</p>
			</div>`}
			location={{ lat, lon }}
		></GeneralMarker>
	);
}
