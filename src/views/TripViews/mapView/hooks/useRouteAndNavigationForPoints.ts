import { MapBoxDirectionsResponse } from '@/types/map';
import useCurrentUserOutOfTripRoute from './useCurrentUserOutOfTripRoute';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';

interface IUseRouteAndNavigationProps {
	points: { lon: number; lat: number }[];
	userCurrentLocation: { lon: number; lat: number } | null;
	runGetDirectionsRoute?: boolean;
}

interface IUseRouteAndNavigationReturn {
	routeData: MapBoxDirectionsResponse | null;
	isOutOfRoute: boolean;
}

export default function useRouteAndNavigation({
	points,
	userCurrentLocation,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	const { isOutOfRoute, segmantPointsIndexs } = useCurrentUserOutOfTripRoute({
		userLocation: userCurrentLocation,
		geometryPoints: routeData?.routes[0]?.geometry.coordinates || [],
	});

	return { routeData, isOutOfRoute };
}
