import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';
import useNextStepIndex from './useNextStepIndex';
import { useRouteProgress } from './useRouteProgress';
import { Point } from '@/utils/map.functions';
import useCurrentUserOutOfTripRoute from './useCurrentUserOutOfTripRoute';

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
	resetNavigation: () => void;
}

export default function useRouteAndNavigation({
	points,
	userLocation,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { routeData } = useMapboxDirectionRoute({
		points,
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
		geometryPoints: routeData?.routes[0].geometry.coordinates || [],
		userLocation,
	});

	return {
		routeData,
		walkedPath,
		nextStepIndex,
		userToStepNextDistance: userToStepNextDistance.current,
		isOutOfRoute,

		resetNavigation: () => {
			resetWalkedPath();
			resetOutOfRoute();
		},
	};
}
