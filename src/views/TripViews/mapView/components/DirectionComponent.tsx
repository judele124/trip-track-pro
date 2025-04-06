import Icon from '@/components/icons/Icon';
import { MapBoxDirectionsResponse } from '@/types/map';
import { useMemo } from 'react';

function getDistance(a: { lat: number; lon: number }, b: number[]) {
	const dx = a.lat - b[1];
	const dy = a.lon - b[0];
	return Math.sqrt(dx * dx + dy * dy);
}
type ManeuverStep = {
	maneuver: {
		location: [number, number];
		instruction: string;
	};
	distance: number;
	duration: number;
	name: string;
};

interface DirectionProps {
	userLocation?: { lat: number; lon: number } | null;
	routeData?: MapBoxDirectionsResponse | null;
}

const DirectionComponent = ({ userLocation, routeData }: DirectionProps) => {
	const nextSteps = useMemo(() => {
		if (!userLocation || !routeData?.routes?.[0]?.legs?.[0]?.steps) return [];
		const steps = routeData.routes[0].legs.flatMap(
			(leg) => leg.steps
		) as ManeuverStep[];

		let closestStepIndex = 0;
		let minDistance = Infinity;

		steps.forEach((step, index) => {
			const distance = getDistance(userLocation, step.maneuver.location);
			if (distance < minDistance) {
				minDistance = distance;
				closestStepIndex = index;
			}
		});
		return steps.slice(closestStepIndex, closestStepIndex + 3);
	}, [userLocation, routeData]);
	return (
		<>
			{nextSteps.length > 0 && (
				<div className='page-colors absolute bottom-24 left-4 right-4 z-50 m-4 max-h-[50vh] overflow-auto rounded-lg border-2 border-primary text-sm'>
					{nextSteps.map((step, index) => (
						<div
							key={index}
							className={`flex items-center justify-between p-2 text-gray-800 ${index < nextSteps.length - 1 ? 'border-b-2 border-primary' : ''}`}
						>
							<div className='flex w-[50%] flex-col'>
								{index === 0 && <span className=' '>next step</span>}
								<span className='font-semibold'>
									{step.maneuver.instruction}
								</span>
							</div>
							<div className='flex items-center gap-4 text-sm text-gray-600'>
								<div className='flex flex-row items-center text-center'>
									<Icon name='userWalking' fill='#ce5737' />{' '}
									{Math.round(step.distance) > 1000
										? `${(Math.round(step.distance) / 1000).toFixed(1)} km`
										: `${Math.round(step.distance)} meters`}
								</div>
								<div className='flex min-w-[45%] items-center gap-x-0.5 border-l-2 border-gray-500 pl-1'>
									<Icon name='clock' fill='#ce5737' size='16' />{' '}
									{Math.ceil(step.duration / 60)} min
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default DirectionComponent;
