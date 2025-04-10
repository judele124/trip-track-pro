import { useMapContext } from '@/contexts/MapContext';
import { MapBoxDirectionsResponse } from '@/types/map';
import { useEffect } from 'react';

interface IMapRouteProps {
	route: MapBoxDirectionsResponse;
}

export default function MapRoute({ route }: IMapRouteProps) {
	const { addRoute } = useMapContext();
	useEffect(() => {
		addRoute(route);
	}, []);
	return null;
}
