import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';
import useNextStepIndex from './useNextStepIndex';
import { useRouteProgress } from './useRouteProgress';
import { Point } from '@/utils/map.functions';
import useCurrentUserOutOfTripRoute from './useCurrentUserOutOfTripRoute';
import { useEffect, useState } from 'react';

interface IUseRouteAndNavigationProps {
	userLocation: { lon: number; lat: number } | null;
	points: { lon: number; lat: number }[];
}

interface IUseRouteAndNavigationReturn {
	routeData: MapBoxDirectionsResponse | null | undefined;
	walkedPath: Point[];
	nextStepIndex: number;
	userToStepNextDistance: number;
	isOutOfRoute: boolean;
}

export default function useRouteAndNavigation({
	userLocation,
	points,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const [currentRoutePoints, setCurrentRoutePoints] =
		useState<{ lon: number; lat: number }[]>(points);

	const [currentOutOfRoutePoints, setCurrentOutOfRoutePoints] = useState<
		Point[]
	>([]);

	const { routeData } = useMapboxDirectionRoute({
		points: currentRoutePoints,
	});

	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation,
		steps: routeData?.routes[0].legs[0].steps,
	});

	const { walkedPath, resetWalkedPath } = useRouteProgress({
		userLocation: userLocation ? [userLocation.lon, userLocation.lat] : null,
		routeCoordinates: routeData?.routes[0].geometry.coordinates || [],
	});

	const { isOutOfRoute, resetOutOfRoute } = useCurrentUserOutOfTripRoute({
		geometryPoints: currentOutOfRoutePoints,
		userLocation,
	});

	// when user is out of route, update points state to restart the route data logic
	useEffect(() => {
		if (isOutOfRoute && userLocation) {
			const newPoints = [
				userLocation,
				...points.slice(nextStepIndex, points.length),
			];
			setCurrentRoutePoints(newPoints);
		}
	}, [isOutOfRoute]);

	// add a point at the user location when route data is loaded for out of route logic
	// and reset walked path and out of route
	useEffect(() => {
		if (!routeData) return;

		const routePoints = userLocation
			? [
					[userLocation.lon, userLocation.lat],
					...routeData.routes[0].geometry.coordinates,
				]
			: routeData.routes[0].geometry.coordinates;

		setCurrentOutOfRoutePoints(routePoints);
		resetWalkedPath();
		resetOutOfRoute();
	}, [routeData]);

	return {
		routeData,
		walkedPath,
		nextStepIndex,
		userToStepNextDistance: userToStepNextDistance.current,
		isOutOfRoute,
	};
}
