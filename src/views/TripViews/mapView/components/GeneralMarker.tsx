import { ReactNode, useRef } from 'react';
import useMarker from '../hooks/useMarker';
import { useMap } from '../Map';

interface IGeneralMarkerProps {
	location: { lat: number; lon: number };
	children: ReactNode;
}

export default function GeneralMarker({
	location,
	children,
}: IGeneralMarkerProps) {
	const { isMapReady, mapRef } = useMap();
	const ref = useRef<HTMLDivElement>(null);

	useMarker({
		ref,
		location,
		isMapReady,
		mapRef,
	});

	return <div ref={ref}>{children}</div>;
}
