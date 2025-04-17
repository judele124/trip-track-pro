import Icon from '@/components/icons/Icon';
import { DirectionStep } from '@/types/map';
import { IconName } from '@/components/icons/Icon';
import { useEffect, useMemo, useRef } from 'react';
import { useMap } from '../Map';
import { isOutOfRouteBetweenSteps } from '@/utils/map.functions';
import useNextStepIndex from '../hooks/useNextStepIndex';
import useDrawRangeAroundStop from '../hooks/useDrawRangeAroundStop';

interface DirectionComponentProps {
	steps: DirectionStep[];
	userLocation: { lat: number; lon: number } | null;
}

const directions: Record<string, IconName> = {
	straight: 'directionStraightArrow',
	right: 'directionRightArrow',
	left: 'directionLeftArrow',
};

const DirectionComponent = ({
	steps,
	userLocation,
}: DirectionComponentProps) => {
	const { mapRef, isMapReady } = useMap();
	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation,
		steps,
	});

	useDrawRangeAroundStop({
		isMapReady,
		mapRef,
		location: steps[nextStepIndex]?.maneuver.location,
	});

	const nextUserCheckpoint = useRef(0);

	useEffect(() => {
		if (!mapRef.current || steps.length === 0 || !steps[nextStepIndex]) return;

		const {
			maneuver: { location },
		} = steps[nextStepIndex];

		mapRef.current.flyTo({
			center: location,
			zoom: 19,
			speed: 3,
		});
	}, [nextStepIndex]);

	// useEffect(() => {
	// 	if (!steps || steps.length === 0 || !userLocation) return;

	// 	const { lat, lon } = userLocation;
	// 	const isOutOfRoute = isOutOfRouteBetweenSteps({
	// 		userLocation: [lat, lon],
	// 		routePoints: fakePoints.map((point) => [point.lon, point.lat]),
	// 		lastStepIndex: nextUserCheckpoint.current,
	// 		threshold: 0.02,
	// 	});

	// 	nextUserCheckpoint.current = isOutOfRoute.nextStationIndex;

	// 	if (isOutOfRoute.isOut) {
	// 		console.log('isOutOfRoute');
	// 	}
	// }, [userLocation]);

	const nextStep = steps[nextStepIndex];

	return (
		<>
			<div className='page-colors absolute bottom-24 left-1/2 z-50 max-h-[50vh] w-[90vw] max-w-[380px] -translate-x-1/2 overflow-y-auto rounded-2xl border-2 border-primary text-sm'>
				{(!steps || steps.length === 0) && <div>no route found</div>}
				{nextStep && (
					<div className='flex items-center justify-between p-2 text-gray-800 dark:text-light'>
						<Icon
							name={
								directions[nextStep.maneuver.modifier] ||
								'directionStraightArrow'
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
								{`${Math.floor(userToStepNextDistance.current)} meters`}
							</div>
							<div className='flex min-w-[45%] items-center gap-x-0.5 border-l-2 border-gray-500 pl-1'>
								<Icon name='clock' fill='#ce5737' size='16' />{' '}
								{Math.ceil(nextStep.duration / 60)} min
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default DirectionComponent;
