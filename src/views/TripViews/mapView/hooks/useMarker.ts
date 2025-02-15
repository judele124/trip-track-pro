import { Map, Marker } from 'mapbox-gl';
import { RefObject, useEffect } from 'react';

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
	toCenter,
}: IUseMarketProps): IUseMarketReturn {
	useEffect(() => {
		if (!mapRef?.current || !isMapReady || !ref?.current) return;

		const marker = new Marker({
			element: ref.current,
		})
			.setLngLat([lon, lat])
			.addTo(mapRef.current);

		if (toCenter) {
			mapRef.current.setCenter([lon, lat]);
		}

		return () => {
			marker.remove();
		};
	}, [isMapReady]);

	return {};
}
