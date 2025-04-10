import Icon from '@/components/icons/Icon';
import { MapBoxDirectionsResponse } from '@/types/map';
import { useEffect, useState } from 'react';
import { IconName } from '@/components/icons/Icon';
import { calculateDistance } from '@/utils/functions';

interface DirectionProps {
	userLocation?: { lat: number; lon: number } | null;
	steps?: MapBoxDirectionsResponse['routes'][0]['legs'][0]['steps'] | null;
}

const directions: Record<string, IconName> = {
	straight: 'directionStraightArrow',
	right: 'directionRightArrow',
	left: 'directionLeftArrow',
};

const DirectionComponent = ({ userLocation, steps }: DirectionProps) => {
	const [userStepIndex, _] = useState(0);

	useEffect(() => {
		if (!steps || steps.length === 0 || !userLocation) return;
		console.table({
			user: [userLocation.lat, userLocation.lon],
			step: steps?.[0].maneuver.location,
		});

		const distance = calculateDistance(
			userLocation.lat,
			userLocation.lon,
			steps?.[0].maneuver.location[1],
			steps?.[0].maneuver.location[1]
		);

		console.log(distance);

		// console.log(
		// 	calculateDistance(
		// 		userLocation.lat,
		// 		userLocation.lon,
		// 		steps?.[0].maneuver.location[0],
		// 		steps?.[0].maneuver.location[1]
		// 	)
		// );
	}, [userLocation]);

	const nextStep = steps?.[userStepIndex];

	return (
		<div className='page-colors absolute bottom-24 left-1/2 z-50 max-h-[50vh] w-[90vw] max-w-[380px] -translate-x-1/2 overflow-y-auto rounded-2xl border-2 border-primary text-sm'>
			{(!steps || steps.length === 0) && <div>no route found</div>}
			{nextStep && (
				<div className='flex items-center justify-between p-2 text-gray-800 dark:text-light'>
					<Icon
						name={
							directions[nextStep.maneuver.modifier] || 'directionStraightArrow'
						}
						size='18'
						fill='#ce5737'
						className='mr-2'
					/>
					<div className='flex w-[50%] flex-col'>
						<span className='text-sm font-semibold'>
							{nextStep.maneuver.instruction}
						</span>
					</div>
					<div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300'>
						<div className='flex flex-row items-center text-center'>
							<Icon name='userWalking' fill='#ce5737' />{' '}
							{Math.round(nextStep.distance) > 1000
								? `${(Math.round(nextStep.distance) / 1000).toFixed(1)} km`
								: `${Math.round(nextStep.distance)} meters`}
						</div>
						<div className='flex min-w-[45%] items-center gap-x-0.5 border-l-2 border-gray-500 pl-1'>
							<Icon name='clock' fill='#ce5737' size='16' />{' '}
							{Math.ceil(nextStep.duration / 60)} min
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DirectionComponent;
