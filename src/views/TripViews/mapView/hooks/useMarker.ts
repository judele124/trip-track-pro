import { Map, Marker } from 'mapbox-gl';
import { RefObject, useEffect, useRef } from 'react';

interface IUseMarketProps {
	isMarkerReady: boolean;
	ref: RefObject<HTMLElement | null>;
	isMapReady: boolean;
	mapRef: RefObject<Map | null>;
	location: { lat: number; lon: number };
	toCenter?: boolean;
}

interface IUseMarketReturn {}

export default function useMarker({
	isMarkerReady,
	ref,
	isMapReady,
	mapRef,
	location: { lat, lon },
}: IUseMarketProps): IUseMarketReturn {
	const marker = useRef<Marker | null>(null);
	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;
		if (!ref.current || !isMarkerReady) return;
		marker.current = new Marker({
			element: ref.current,
		}).setLngLat([lon, lat]);
		marker.current.addTo(mapRef.current);
		return () => {
			if (!marker.current) return;
			marker.current.remove();
		};
	}, [isMapReady, isMarkerReady]);

	useEffect(() => {
		if (!marker.current) return;
		marker.current.setLngLat([lon, lat]);
	}, [lon, lat]);

	return {};
}
