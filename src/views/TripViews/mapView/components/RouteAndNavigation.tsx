import MapRoute from './MapRoute';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import DirectionComponent from './DirectionComponent';
import useRouteAndNavigation from '../hooks/useRouteAndNavigationForPoints';

interface IRouteAndNavigationProps {
	points: { lon: number; lat: number }[];
	routeOptions?: IRouteLayerSpecification;
	userLocation: { lat: number; lon: number } | null;
}

export default function RouteAndNavigation({
	points,
	routeOptions,
	userLocation,
}: IRouteAndNavigationProps) {
	const { routeData } = useRouteAndNavigation({
		points,
		userCurrentLocation: userLocation,
	});

	if (!routeData || !userLocation || !points.length) return null;
	return (
		<>
			<MapRoute route={routeData} options={routeOptions} />

			{/* Direction Info UI */}
			<DirectionComponent
				userLocation={userLocation}
				steps={routeData.routes[0].legs[0].steps}
			/>
		</>
	);
}
