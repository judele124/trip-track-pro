import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapContext } from '@/contexts/MapContext/MapContext';

interface MapTrackingOptions {
	zoom?: number;
	speed?: number;
	duration?: number;
}

export function useMapTracking(options: MapTrackingOptions = {}) {
	const { mapRef, isMapReady } = useMapContext();
	const { zoom = 16, speed = 1.5, duration = 1000 } = options;
	const [isTracking, setIsTracking] = useState(true);
	const isUserInteractingWithMap = useRef(false);

	const centerOnUser = useCallback(
		(location: { lon: number; lat: number }) => {
			if (!mapRef.current || isUserInteractingWithMap.current) return;

			const currentZoom = mapRef.current.getZoom();
			const currentBearing = mapRef.current.getBearing();
			const currentPitch = mapRef.current.getPitch();

			mapRef.current.flyTo({
				center: [location.lon, location.lat],
				zoom: currentZoom,
				bearing: currentBearing,
				pitch: currentPitch,
				speed,
				essential: true,
				duration,
			});
		},
		[mapRef, zoom, speed, duration]
	);

	const toggleTracking = useCallback(
		(value?: boolean) => {
			const newValue = value ?? !isTracking;
			setIsTracking(newValue);
		},
		[isTracking]
	);

	const handleDragStart = useCallback(() => {
		if (isTracking) {
			toggleTracking(false);
		}
	}, [isTracking, toggleTracking]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		map.on('dragstart', handleDragStart);
		map.on('zoomstart', () => {
			isUserInteractingWithMap.current = true;
		});
		map.on('pitchstart', () => {
			isUserInteractingWithMap.current = true;
		});
		map.on('rotatestart', () => {
			isUserInteractingWithMap.current = true;
		});
		map.on('zoomend', () => {
			isUserInteractingWithMap.current = false;
		});
		map.on('pitchend', () => {
			isUserInteractingWithMap.current = false;
		});
		map.on('rotateend', () => {
			isUserInteractingWithMap.current = false;
		});

		return () => {
			map.off('dragstart', handleDragStart);
			map.off('zoomstart', () => {
				isUserInteractingWithMap.current = true;
			});
			map.off('pitchstart', () => {
				isUserInteractingWithMap.current = true;
			});
			map.off('rotatestart', () => {
				isUserInteractingWithMap.current = true;
			});
			map.off('zoomend', () => {
				isUserInteractingWithMap.current = false;
			});
			map.off('pitchend', () => {
				isUserInteractingWithMap.current = false;
			});
			map.off('rotateend', () => {
				isUserInteractingWithMap.current = false;
			});
		};
	}, [isMapReady, handleDragStart, toggleTracking]);

	return {
		isTracking,
		toggleTracking,
		centerOnUser,
	};
}
