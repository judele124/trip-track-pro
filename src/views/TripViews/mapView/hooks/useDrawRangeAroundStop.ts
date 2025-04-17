import {
	addCircleRadiusToLocation,
	metersToPixels,
} from '@/utils/map.functions';
import { RANGE_THRESHOLD } from './useNextStepIndex';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';

interface IuseDrawRangeAroundStopProps {
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
	location: [number, number];
	color?: string;
}

export default function useDrawRangeAroundStop({
	isMapReady,
	mapRef,
	location,
	color = '#3887be',
}: IuseDrawRangeAroundStopProps) {
	const animatedCircleInterval = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!isMapReady || !mapRef.current) return;

		const circleOuterId = 'circle-outer';
		const radiusInPixels = metersToPixels(
			mapRef.current,
			RANGE_THRESHOLD,
			location
		);

		addCircleRadiusToLocation(circleOuterId, mapRef.current, location, {
			id: circleOuterId,
			type: 'circle',
			source: circleOuterId,
			paint: {
				'circle-color': color,
				'circle-opacity': 0.4,
				'circle-radius': radiusInPixels,
				'circle-radius-transition': { duration: 20 },
				'circle-pitch-alignment': 'map',
				'circle-pitch-scale': 'map',
			},
		});

		const circleInnerId = 'circle-inner';

		addCircleRadiusToLocation(circleInnerId, mapRef.current, location, {
			id: circleInnerId,
			type: 'circle',
			source: circleInnerId,
			paint: {
				'circle-color': color,
				'circle-opacity': 0.0,
				'circle-radius': 0,
				'circle-radius-transition': { duration: 1000 },
				'circle-opacity-transition': { duration: 1000 },
				'circle-pitch-alignment': 'map',
				'circle-pitch-scale': 'map',
			},
		});

		animatedCircleInterval.current = setInterval(() => {
			if (!mapRef.current) return;

			const updatedRadius = metersToPixels(
				mapRef.current,
				RANGE_THRESHOLD,
				location
			);

			mapRef.current.setPaintProperty(
				circleInnerId,
				'circle-radius',
				updatedRadius
			);

			mapRef.current.setPaintProperty(circleInnerId, 'circle-opacity', 0.5);

			setTimeout(() => {
				mapRef.current?.setPaintProperty(circleInnerId, 'circle-opacity', 0);
				mapRef.current?.setPaintProperty(circleInnerId, 'circle-radius', 0);
			}, 1500);
		}, 3000);

		const updateCircleRadius = () => {
			if (!mapRef.current) return;
			const updatedRadius = metersToPixels(
				mapRef.current,
				RANGE_THRESHOLD,
				location
			);

			mapRef.current.setPaintProperty(
				circleOuterId,
				'circle-radius',
				updatedRadius
			);

			mapRef.current.setPaintProperty(
				circleInnerId,
				'circle-radius',
				updatedRadius
			);
		};

		mapRef.current.on('zoom', updateCircleRadius);

		return () => {
			if (!mapRef.current || !animatedCircleInterval.current) return;
			mapRef.current.off('zoom', updateCircleRadius);
			clearInterval(animatedCircleInterval.current);
		};
	}, [isMapReady, location]);
}
