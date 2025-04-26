import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';

interface IUseRouteAndNavigationProps {
	points: { lon: number; lat: number }[];
}

interface IUseRouteAndNavigationReturn {
	routeData: MapBoxDirectionsResponse | null | undefined;
}

export default function useRouteAndNavigation({
	points,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	return { routeData };
}
