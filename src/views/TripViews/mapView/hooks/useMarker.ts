import { Map, Marker } from 'mapbox-gl';
import { RefObject, useEffect, useRef } from 'react';

interface IUseMarketProps {
	ref: RefObject<HTMLElement | null>;
	isMapReady: boolean;
	mapRef: RefObject<Map | null>;
	location: { lat: number; lon: number };
	toCenter?: boolean;
}

interface IUseMarketReturn {}

export default function useMarker({
	ref,
	isMapReady,
	mapRef,
	location: { lat, lon },
}: IUseMarketProps): IUseMarketReturn {
	const markerRef = useRef<Marker | null>(null);
	useEffect(() => {
		if (!mapRef?.current || !isMapReady || !ref?.current) return;

		markerRef.current = new Marker({
			element: ref.current,
		})
			.setLngLat([lon, lat])
			.addTo(mapRef.current);

		return () => {
			markerRef.current?.remove();
		};
	}, [isMapReady]);

	useEffect(() => {
		if (!markerRef.current) return;

		markerRef.current.setLngLat([lon, lat]);
	}, [lon, lat]);

	return {};
}
