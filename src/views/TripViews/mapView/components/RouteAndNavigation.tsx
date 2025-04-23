import MapRoute from './MapRoute';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import DirectionComponent from './DirectionComponent';
import useRouteAndNavigation from '../hooks/useRouteAndNavigationForPoints';
import { useEffect, useState } from 'react';
import useNextStepIndex from '../hooks/useNextStepIndex';

interface IRouteAndNavigationProps {
	originalPoints: { lon: number; lat: number }[];
	routeOptions?: IRouteLayerSpecification;
	userLocation: { lat: number; lon: number } | null;
}

export default function RouteAndNavigation({
	originalPoints,
	routeOptions,
	userLocation,
}: IRouteAndNavigationProps) {
	const [points, setPoints] = useState<{ lon: number; lat: number }[]>([]);

	const { routeData, isOutOfRoute } = useRouteAndNavigation({
		points,
		userCurrentLocation: userLocation,
	});

	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation,
		steps: routeData?.routes[0].legs[0].steps,
	});

	useEffect(() => {
		if (originalPoints.length > 0 && userLocation) {
			setPoints(originalPoints);
		}
	}, [originalPoints]);

	useEffect(() => {
		if (isOutOfRoute && userLocation) {
			setPoints((prev) => [userLocation, ...prev.slice(nextStepIndex)]);
		}
	}, [isOutOfRoute]);

	if (!routeData || !userLocation || !points.length) return null;
	return (
		<>
			<MapRoute route={routeData} options={routeOptions} />

			{/* Direction Info UI */}

			<DirectionComponent
				nextStepIndex={nextStepIndex}
				userToStepNextDistance={userToStepNextDistance.current}
				steps={routeData.routes[0].legs[0].steps}
			/>
		</>
	);
}
