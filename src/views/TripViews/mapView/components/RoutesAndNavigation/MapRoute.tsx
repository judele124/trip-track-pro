import { useMapContext } from '@/contexts/MapContext/MapContext';
import { MapBoxDirectionsResponse } from '@/types/map';
import { addRouteToMap, IRouteLayerSpecification } from '@/utils/map.functions';
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
		lineColor: '#ff0000',
		lineOpacity: 1,
		lineWidth: 3,
	},
	beforeLayerIds,
}: IMapRouteProps) {
	const { mapRef } = useMapContext();

	useEffect(() => {
		if (!mapRef.current) return;
		addRouteToMap(id, mapRef.current, route, options, beforeLayerIds);
		return () => {
			if (!mapRef.current) return;
			mapRef.current.removeLayer(id);
			mapRef.current.removeSource(id);
		};
	}, [id]);

	useEffect(() => {
		if (!mapRef.current) return;
		const existingSource = mapRef.current.getSource(id);

		if (existingSource?.type === 'geojson') {
			try {
				existingSource.setData(route.routes[0].geometry);
				return;
			} catch (error) {
				console.error('Error updating existing route:', error);
			}
		} else {
			addRouteToMap(id, mapRef.current, route, options, beforeLayerIds);
		}
	}, [route]);

	useEffect(() => {
		if (!mapRef.current) return;
		mapRef.current.setPaintProperty(id, 'line-color', options.lineColor);
		mapRef.current.setPaintProperty(id, 'line-opacity', options.lineOpacity);
		mapRef.current.setPaintProperty(id, 'line-width', options.lineWidth);
	}, [options]);

	return null;
}
