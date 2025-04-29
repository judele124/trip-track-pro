import { useMap } from '../../Map';
import { MapBoxDirectionsResponse } from '@/types/map';
import { addRouteToMap, IRouteLayerSpecification } from '@/utils/map.functions';
import { useEffect } from 'react';

interface IMapRouteProps {
	id: string;
	route: MapBoxDirectionsResponse;
	options?: IRouteLayerSpecification;
	beforeLayerIds: string[];
}

export default function MapRoute({
	id,
	route,
	options = {
		lineColor: '#ff0000',
		lineOpacity: 1,
		lineWidth: 3,
	},
	beforeLayerIds = [],
}: IMapRouteProps) {
	const { mapRef } = useMap();
	useEffect(() => {
		if (!mapRef.current) return;
		addRouteToMap(id, mapRef.current, route, options);
		beforeLayerIds.forEach((l) => {
			if (mapRef.current?.getLayer(l)) {
				console.log(l);

				mapRef.current.moveLayer(l, id);
			}
		});
	}, [route, options]);
	return null;
}
