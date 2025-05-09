import MapRoute from './MapRoute';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import DirectionComponent from './DirectionComponent';
import useRouteAndNavigation from '../../hooks/useRouteAndNavigation';
import { useEffect, useState } from 'react';
import CurrentUserMarker from '../Markers/CurrentUserMarker';
import { useAuthContext } from '@/contexts/AuthContext';
import MapArrow from './MapArrow';

interface IRouteAndNavigationProps {
	routeId: string;
	originalPoints: { lon: number; lat: number }[];
	routeOptions?: IRouteLayerSpecification;
	fillRouteOption?: IRouteLayerSpecification;
	userLocation: { lat: number; lon: number } | null;
}

export default function RouteAndNavigation({
	routeId,
	originalPoints,
	routeOptions,
	fillRouteOption,
	userLocation,
}: IRouteAndNavigationProps) {
	const { user } = useAuthContext();
	const [points, setPoints] = useState<{ lon: number; lat: number }[]>([]);

	const {
		routeData,
		nextStepIndex,
		walkedPath,
		userToStepNextDistance,
		isOutOfRoute,
		resetNavigation,
	} = useRouteAndNavigation({
		points,
		userLocation,
	});

	useEffect(() => {
		if (originalPoints.length > 0 && userLocation && points.length === 0) {
			setPoints(originalPoints);
		}
	}, [originalPoints, userLocation]);

	useEffect(() => {
		if (isOutOfRoute && userLocation) {
			const newPoints = [
				userLocation,
				...points.slice(nextStepIndex, points.length),
			];
			setPoints(newPoints);
			resetNavigation();
		}
	}, [isOutOfRoute]);

	if (!routeData || !userLocation || !points.length || !user) return null;

	return (
		<>
			{userLocation && user && (
				<CurrentUserMarker location={userLocation} user={user} />
			)}

			{nextStepIndex != routeData.routes[0].legs[0].steps.length - 1 && (
				<MapArrow
					outerId={`arrow-${routeId}`}
					maneuver={routeData.routes[0].legs[0].steps[nextStepIndex].maneuver}
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
					nextStepIndex != routeData.routes[0].legs[0].steps.length - 1
						? `arrow-${routeId}`
						: undefined
				}
			/>

			<MapRoute
				route={routeData}
				options={routeOptions}
				id={`route-${routeId}`}
				beforeLayerIds={`walkedPath-${routeId}`}
			/>

			{/* Direction Info UI */}
			<DirectionComponent
				nextStepIndex={nextStepIndex}
				userToStepNextDistance={userToStepNextDistance}
				steps={routeData.routes[0].legs[0].steps}
			/>
		</>
	);
}
