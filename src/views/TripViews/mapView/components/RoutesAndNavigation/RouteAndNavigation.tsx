import MapRoute from './MapRoute';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import DirectionComponent from './DirectionComponent';
import useRouteAndNavigation from '../../hooks/useRouteAndNavigation';
import { useAuthContext } from '@/contexts/AuthContext';
import MapArrow from './MapArrow';
import { useMemo } from 'react';

interface IRouteAndNavigationProps {
	routeId: string;
	originalPoints: { lon: number; lat: number }[];
	routeOptions?: IRouteLayerSpecification;
	fillRouteOption?: IRouteLayerSpecification;
	userLocation: { lat: number; lon: number } | null;
	active?: boolean;
}

export default function RouteAndNavigation({
	routeId,
	originalPoints,
	routeOptions,
	fillRouteOption,
	userLocation,
	active,
}: IRouteAndNavigationProps) {
	const { user } = useAuthContext();

	const { routeData, nextStepIndex, walkedPath, userToStepNextDistance } =
		useRouteAndNavigation({
			userLocation,
			points: originalPoints,
			active,
		});

	const memoizedRouteData = useMemo(() => routeData, [routeData]);

	if (!memoizedRouteData || !userLocation || !user) return null;

	return (
		<>
			{active && (
				<>
					{nextStepIndex !=
						memoizedRouteData.routes[0].legs[0].steps.length - 1 && (
						<MapArrow
							outerId={`arrow-${routeId}`}
							maneuver={
								memoizedRouteData.routes[0].legs[0].steps[nextStepIndex]
									.maneuver
							}
							fillColor='#32adff'
							outlineColor='#264fa8'
						/>
					)}

					<MapRoute
						id={`walkedPath-${routeId}`}
						route={{
							code: '123',
							uuid: '123',
							waypoints: [],
							routes: [
								{
									distance: 0,
									duration: 0,
									geometry: { coordinates: walkedPath, type: 'LineString' },
									legs: [],
									weight: 0,
								},
							],
						}}
						options={fillRouteOption}
						beforeLayerIds={
							nextStepIndex !=
							memoizedRouteData.routes[0].legs[0].steps.length - 1
								? `arrow-${routeId}`
								: undefined
						}
					/>

					{/* Direction Info UI */}
					<DirectionComponent
						nextStepIndex={nextStepIndex}
						userToStepNextDistance={userToStepNextDistance}
						steps={memoizedRouteData.routes[0].legs[0].steps}
					/>
				</>
			)}

			<MapRoute
				route={memoizedRouteData}
				options={routeOptions}
				id={`route-${routeId}`}
				beforeLayerIds={active ? `walkedPath-${routeId}` : undefined}
			/>
		</>
	);
}
