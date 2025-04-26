import { useEffect } from 'react';
import { useMap } from '../../Map';
import {
	addSourceAndLayerToMap,
	createArrowPolygon,
} from '@/utils/map.functions';
import { Maneuver } from '@/types/map';

function MapArrow({
	maneuver: { location, bearing_after },
}: {
	maneuver: Maneuver;
}) {
	const { mapRef } = useMap();

	useEffect(() => {
		if (!mapRef.current) return;
		const map = mapRef.current;

		const arrowData = createArrowPolygon(location, bearing_after);

		addSourceAndLayerToMap('arrow-shape', map, arrowData, {
			id: 'arrow-shape-layer',
			type: 'fill',
			source: 'arrow-shape',
			paint: {
				'fill-color': '#ff0000',
				'fill-opacity': 0.8,
			},
		});

		// Cleanup: remove on unmount
		return () => {
			if (map.getLayer('arrow-shape-layer'))
				map.removeLayer('arrow-shape-layer');
			if (map.getSource('arrow-shape')) map.removeSource('arrow-shape');
		};
	}, [mapRef, bearing_after, location]);

	return null;
}

export default MapArrow;
