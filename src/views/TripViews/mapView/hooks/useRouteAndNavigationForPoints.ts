import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';
import useFakeUserLocation from '../tests/useFakeUserLocation';
import useNextStepIndex from './useNextStepIndex';
import { useRouteProgress } from './useRouteProgress';
import { Point } from '@/utils/map.functions';

interface IUseRouteAndNavigationProps {
	points: { lon: number; lat: number }[];
}

interface IUseRouteAndNavigationReturn {
	routeData: MapBoxDirectionsResponse | null | undefined;
	walkedPath: Point[];
	nextStepIndex: number;
	userToStepNextDistance: number;
	fakeLocation: { lon: number; lat: number } | null;
}

export default function useRouteAndNavigation({
	points,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	const fakeLocation = useFakeUserLocation({
		points:
			routeData?.routes[0].geometry.coordinates.map((point) => ({
				lat: point[1],
				lon: point[0],
			})) || [],
		updateIntervalMs: 100,
		speed: 100,
	});

	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation: fakeLocation,
		steps: routeData?.routes[0].legs[0].steps,
	});

	const { walkedPath } = useRouteProgress({
		userLocation: fakeLocation ? [fakeLocation.lon, fakeLocation.lat] : null,
		routeCoordinates: routeData?.routes[0].geometry.coordinates || [],
	});

	return {
		routeData,
		walkedPath,
		nextStepIndex,
		userToStepNextDistance: userToStepNextDistance.current,
		fakeLocation,
	};
}
