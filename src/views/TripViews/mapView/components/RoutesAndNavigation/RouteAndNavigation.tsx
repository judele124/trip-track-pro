import MapRoute from './MapRoute';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import DirectionComponent from './DirectionComponent';
import useRouteAndNavigation from '../../hooks/useRouteAndNavigationForPoints';
import { useEffect, useMemo, useState } from 'react';
import useNextStepIndex from '../../hooks/useNextStepIndex';
import useFakeUserLocation from '../../tests/useFakeUserLocation';
import { useRouteProgress } from '../../hooks/useRouteProgress';
import useCurrentUserOutOfTripRoute from '../../hooks/useCurrentUserOutOfTripRoute';
import CurrentUserMarker from '../Markers/CurrentUserMarker';
import { useAuthContext } from '@/contexts/AuthContext';
import MapArrow from './MapArrow';

interface IRouteAndNavigationProps {
	originalPoints: { lon: number; lat: number }[];
	routeOptions?: IRouteLayerSpecification;
	fillRouteOption?: IRouteLayerSpecification;
	userLocation: { lat: number; lon: number } | null;
}

export default function RouteAndNavigation({
	originalPoints,
	routeOptions,
	fillRouteOption,
	userLocation,
}: IRouteAndNavigationProps) {
	const { user } = useAuthContext();
	const [points, setPoints] = useState<{ lon: number; lat: number }[]>([]);

	const { routeData } = useRouteAndNavigation({
		points,
	});

	const fakeLocation = useFakeUserLocation({
		points:
			routeData?.routes[0].geometry.coordinates.map((point) => ({
				lat: point[1],
				lon: point[0],
			})) || [],
	});

	const { isOutOfRoute, segmantPointsIndexs } = useCurrentUserOutOfTripRoute({
		userLocation: fakeLocation,
		geometryPoints: routeData?.routes[0]?.geometry.coordinates || [],
	});

	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation: fakeLocation,
		steps: routeData?.routes[0].legs[0].steps,
	});

	const { walkedPath } = useRouteProgress(
		routeData?.routes[0].geometry.coordinates || [],
		fakeLocation ? [fakeLocation.lon, fakeLocation.lat] : null
	);

	useEffect(() => {
		if (originalPoints.length > 0 && userLocation) {
			setPoints(originalPoints);
		}
	}, [originalPoints]);

	useEffect(() => {
		console.log('isOutOfRoute', isOutOfRoute);

		if (isOutOfRoute && userLocation) {
			setPoints((prev) => [userLocation, ...prev.slice(nextStepIndex)]);
		}
	}, [isOutOfRoute]);

	const memoizedStepLocationIndexInGeometry = useMemo(() => {
		return findIndexPointOnGeometry(
			routeData?.routes[0].geometry.coordinates,
			routeData?.routes[0].legs[0].steps[nextStepIndex].maneuver.location
		);
	}, [routeData, nextStepIndex]);

	if (!routeData || !userLocation || !points.length || !user) return null;

	return (
		<>
			{fakeLocation && user && (
				<CurrentUserMarker location={fakeLocation} user={user} />
			)}

			<MapArrow
				outerId='arrow'
				maneuver={routeData.routes[0].legs[0].steps[nextStepIndex].maneuver}
			/>

			<MapRoute
				id='walkedPath'
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
				beforeLayerIds='arrow'
			/>

			<MapRoute
				route={routeData}
				options={routeOptions}
				id='route'
				beforeLayerIds='walkedPath'
			/>

			{/* Direction Info UI */}
			<DirectionComponent
				nextStepIndex={nextStepIndex}
				userToStepNextDistance={userToStepNextDistance.current}
				steps={routeData.routes[0].legs[0].steps}
			/>
		</>
	);
}

const findIndexPointOnGeometry = (
	geometry: number[][] | undefined,
	point: number[] | undefined
) => {
	if (!geometry || !point) return -1;
	return geometry.findIndex((p) => p[0] === point[0] && p[1] === point[1]);
};
