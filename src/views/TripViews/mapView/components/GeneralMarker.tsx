import { Map } from 'mapbox-gl';
import { ReactNode, RefObject, useRef } from 'react';
import useMarker from '../hooks/useMarker';
import { useMapContext } from '@/contexts/MapContext';

interface IGeneralMarkerProps {
	location: { lat: number; lon: number };
	children: ReactNode;
}

export default function GeneralMarker({
	location,
	children,
}: IGeneralMarkerProps) {
	const { isMapReady, mapRef } = useMapContext();
	const ref = useRef<HTMLDivElement>(null);

	useMarker({
		ref,
		location,
		isMapReady,
		mapRef,
	});

	return <div ref={ref}>{children}</div>;
}
