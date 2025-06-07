import { useMapContext } from '@/contexts/MapContext/MapContext';
import { MapBoxDirectionsResponse } from '@/types/map';
import { IRouteLayerSpecification } from '@/utils/map.functions';
import { useEffect } from 'react';

interface IMapRouteProps {
	id: string;
	route: MapBoxDirectionsResponse;
	options?: IRouteLayerSpecification;
	beforeLayerIds?: string;
}

export default function MapRoute({
	id,
	route,
	options = {
		lineColor: '#1b4965',
		lineOpacity: 1,
		lineWidth: 4,
	},
	beforeLayerIds,
}: IMapRouteProps) {
	const { addRouteToRoutesData, removeRouteFromRoutesData, updateRoute } =
		useMapContext();

	useEffect(() => {
		addRouteToRoutesData(id, route, options, beforeLayerIds);
		return () => {
			removeRouteFromRoutesData(id);
		};
	}, [id]);

	useEffect(() => {
		updateRoute(id, route, options);
	}, [route, options]);

	return null;
}
