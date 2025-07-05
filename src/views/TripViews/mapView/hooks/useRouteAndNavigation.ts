import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';
import { useRouteProgress } from './useRouteProgress';
import { Point } from '@/utils/map.functions';
import useCurrentUserOutOfTripRoute from './useCurrentUserOutOfTripRoute';
import { useEffect, useState } from 'react';
import { useTripSocket } from '@/contexts/socketContext/SocketContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTripContext } from '@/contexts/TripContext';
import { Notification } from '@/contexts/socketContext/types';
import useNextPointIndex from './useNextPointIndex';

interface IUseRouteAndNavigationProps {
	userLocation: { lon: number; lat: number } | null;
	points: { lon: number; lat: number }[];
	active?: boolean;
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
	active,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { socket, addNotification } = useTripSocket();
	const { user } = useAuthContext();
	const { trip } = useTripContext();

	const [currentRoutePoints, setCurrentRoutePoints] =
		useState<{ lon: number; lat: number }[]>(points);

	const [currentOutOfRoutePoints, setCurrentOutOfRoutePoints] = useState<
		Point[]
	>([]);

	const { nextPointIndex: nextStopIndex } = useNextPointIndex({
		userLocation,
		steps: currentRoutePoints.map((point) => [point.lon, point.lat]),
		active,
	});

	const { routeData } = useMapboxDirectionRoute({
		points: currentRoutePoints,
	});

	const {
		nextPointIndex: nextStepIndex,
		userToPointNextDistance: userToStepNextDistance,
	} = useNextPointIndex({
		userLocation,
		steps:
			routeData?.routes[0].legs[0].steps.map(
				(step) => step.maneuver.location
			) || [],
		active,
	});

	const { walkedPath, resetWalkedPath } = useRouteProgress({
		userLocation: userLocation ? [userLocation.lon, userLocation.lat] : null,
		routeCoordinates: routeData?.routes[0].geometry.coordinates || [],
		active,
	});

	const { isOutOfRoute, resetOutOfRoute } = useCurrentUserOutOfTripRoute({
		geometryPoints: currentOutOfRoutePoints,
		userLocation,
		active,
	});

	// when user is out of route, update points state to restart the route data logic
	useEffect(() => {
		if (isOutOfRoute && userLocation) {
			const newPoints = [
				userLocation,
				...points.slice(nextStopIndex, points.length),
			];

			addNotification(new Notification('You are out of trip route', 'warning'));

			if (socket && user && trip) {
				socket.emit('currentUserOutOfTripRoute', trip._id, user._id);
			}
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
