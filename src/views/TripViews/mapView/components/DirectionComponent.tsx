import Icon from '@/components/icons/Icon';
import { DirectionStep } from '@/types/map';
import { IconName } from '@/components/icons/Icon';
import { useEffect } from 'react';
import GeneralMarker from './GeneralMarker';
import { useMap } from '../Map';
import {
	calculateDistanceOnEarth,
	findNextStepPoint,
	isOutOfRouteBetweenSteps,
} from '@/utils/map.functions';
import useNextStepIndex from '../hooks/useNextStepIndex';

interface DirectionComponentProps {
	steps: DirectionStep[];
	userLocation: { lat: number; lon: number } | null;
	fakePoints: { lat: number; lon: number }[];
}

const directions: Record<string, IconName> = {
	straight: 'directionStraightArrow',
	right: 'directionRightArrow',
	left: 'directionLeftArrow',
};

const DirectionComponent = ({
	steps,
	userLocation,
	fakePoints,
}: DirectionComponentProps) => {
	const { mapRef } = useMap();
	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation,
		steps,
	});

	useEffect(() => {
		if (!mapRef.current || steps.length === 0 || !steps[nextStepIndex]) return;

		const {
			maneuver: { location },
		} = steps[nextStepIndex];

		mapRef.current.flyTo({
			center: location,
			zoom: 18,
			speed: 3,
		});

		console.log('nextStepIndex', nextStepIndex);
	}, [nextStepIndex]);

	useEffect(() => {
		if (!steps || steps.length === 0 || !userLocation) return;
		const { lat, lon } = userLocation;
		const [stapLon, atapLat] = steps[nextStepIndex].maneuver.location;
		const userToStepDistance = calculateDistanceOnEarth(
			[lat, lon],
			[atapLat, stapLon]
		);

		const nextStap = findNextStepPoint(
			[lat, lon],
			steps.map((step) => step.maneuver.location),
			nextStepIndex
		);
		console.log('nextStap', nextStap);

		console.log(
			isOutOfRouteBetweenSteps({
				userLocation: [lat, lon],
				routePoints: fakePoints.map((point) => [point.lon, point.lat]),
				lastStepIndex: nextStepIndex,
				threshold: 0.02,
			})
		);
		console.log('userToStepDistance', userToStepDistance);
	}, [userLocation]);

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
			{steps.map(
				(
					{
						maneuver: {
							location: [lon, lat],
						},
					},
					i
				) => {
					return (
						<GeneralMarker key={`${lat}-${lon}-${i}`} location={{ lat, lon }}>
							<div
								className={`rounded-full bg-red-500 ${i === nextStepIndex ? 'size-10 animate-bounce bg-blue-500' : 'size-5'}`}
							></div>
						</GeneralMarker>
					);
				}
			)}
			{fakePoints.map(
				(
					{ lon, lat },

					i
				) => {
					return (
						<GeneralMarker
							key={`${lat}-${lon}-fake-p-${i}`}
							location={{ lat, lon }}
						>
							<div
								className={`rounded-full bg-black ${i === nextStepIndex ? 'size-6 animate-bounce bg-blue-500' : 'size-2'}`}
							></div>
						</GeneralMarker>
					);
				}
			)}
		</>
	);
};

export default DirectionComponent;
