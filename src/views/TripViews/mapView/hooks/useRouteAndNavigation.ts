import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';
import useNextStepIndex from './useNextStepIndex';
import { useRouteProgress } from './useRouteProgress';
import { Point } from '@/utils/map.functions';

interface IUseRouteAndNavigationProps {
	userLocation: { lon: number; lat: number } | null;
	points: { lon: number; lat: number }[];
}

interface IUseRouteAndNavigationReturn {
	routeData: MapBoxDirectionsResponse | null | undefined;
	walkedPath: Point[];
	nextStepIndex: number;
	userToStepNextDistance: number;
}

export default function useRouteAndNavigation({
	points,
	userLocation,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation: userLocation,
		steps: routeData?.routes[0].legs[0].steps,
	});

	const { walkedPath } = useRouteProgress({
		userLocation: userLocation ? [userLocation.lon, userLocation.lat] : null,
		routeCoordinates: routeData?.routes[0].geometry.coordinates || [],
	});

	return {
		routeData,
		walkedPath,
		nextStepIndex,
		userToStepNextDistance: userToStepNextDistance.current,
	};
}
