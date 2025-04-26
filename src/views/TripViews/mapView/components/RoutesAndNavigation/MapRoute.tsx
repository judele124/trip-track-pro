import { useMap } from '../../Map';
import { MapBoxDirectionsResponse } from '@/types/map';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import { useEffect } from 'react';

interface IMapRouteProps {
	id: string;
	route: MapBoxDirectionsResponse;
	options?: IRouteLayerSpecification;
}

export default function MapRoute({
	id,
	route,
	options = {
		lineColor: '#ff0000',
		lineOpacity: 1,
		lineWidth: 3,
	},
}: IMapRouteProps) {
	const { addRoute } = useMap();
	useEffect(() => {
		addRoute({ id, route, options });
	}, [route, options]);
	return null;
}
