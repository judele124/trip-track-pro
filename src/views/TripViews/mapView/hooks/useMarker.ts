import { useMapContext } from '@/contexts/MapContext/MapContext';
import { Map } from 'mapbox-gl';
import { RefObject, useEffect } from 'react';

interface IUseMarketProps {
	id: string;
	ref: RefObject<HTMLElement | null>;
	isMapReady: boolean;
	mapRef: RefObject<Map | null>;
	location: { lat: number; lon: number };
	toCenter?: boolean;
}

interface IUseMarketReturn {}

export default function useMarker({
	id,
	ref,
	isMapReady,
	mapRef,
	location: { lat, lon },
}: IUseMarketProps): IUseMarketReturn {
	const { addMarker, removeMarker, updateMarker } = useMapContext();

	useEffect(() => {
		addMarker({
			id,
			ref,
			isMapReady,
			mapRef,
			location: { lat, lon },
		});
		return () => {
			removeMarker(id);
		};
	}, [isMapReady]);

	useEffect(() => {
		updateMarker({
			id,
			ref,
			isMapReady,
			mapRef,
			location: { lat, lon },
		});
	}, [lon, lat]);

	return {};
}
