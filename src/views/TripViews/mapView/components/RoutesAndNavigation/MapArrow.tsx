import { useEffect } from 'react';
import { useMap } from '../../Map';
import { Maneuver } from '@/types/map';
import { addArrowToMap } from '@/utils/map.functions.arrow';

interface IMapArrowProps {
	outerId: string;
	maneuver: Maneuver;
	fillColor?: string;
	outlineColor?: string;
}

function MapArrow({
	outerId,
	maneuver: { location, bearing_after, bearing_before },
	fillColor = '#32adff',
	outlineColor = 'white',
}: IMapArrowProps) {
	const { mapRef, isMapReady } = useMap();

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;

		const length = 15;
		const width = 3;

		addArrowToMap({
			outerId,
			map: mapRef.current,
			fillColor,
			outlineColor,
			location,
			bearing_after,
			bearing_before,
			length,
			width,
		});
	}, [
		mapRef,
		isMapReady,
		location,
		bearing_after,
		bearing_before,
		fillColor,
		outlineColor,
	]);

	return null;
}

export default MapArrow;
