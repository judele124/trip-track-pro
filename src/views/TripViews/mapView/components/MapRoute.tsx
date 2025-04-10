import { useMap } from '../Map';
import { MapBoxDirectionsResponse } from '@/types/map';
import { useEffect } from 'react';

interface IMapRouteProps {
	route: MapBoxDirectionsResponse;
}

export default function MapRoute({ route }: IMapRouteProps) {
	const { addRoute } = useMap();
	useEffect(() => {
		addRoute(route);
	}, []);
	return null;
}
