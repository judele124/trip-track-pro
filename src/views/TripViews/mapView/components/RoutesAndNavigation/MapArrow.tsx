import { useEffect } from 'react';
import { useMapContext } from '@/contexts/MapContext/MapContext';
import { Maneuver } from '@/types/map';

interface IMapArrowProps {
	outerId: string;
	maneuver: Maneuver;
	fillColor?: string;
	outlineColor?: string;
}

function MapArrow({
	outerId,
	maneuver,
	fillColor = '#32adff',
	outlineColor = 'white',
}: IMapArrowProps) {
	const { mapRef, isMapReady, addArrow, removeArrow } = useMapContext();

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;
		addArrow({
			outerId,
			maneuver,
			fillColor,
			outlineColor,
		});

		return () => {
			removeArrow();
		};
	}, [mapRef, isMapReady, maneuver, fillColor, outlineColor]);

	return null;
}

export default MapArrow;
