import { useCallback, useEffect, useRef, useState } from 'react';
import { Map } from 'mapbox-gl';

interface MapTrackingOptions {
	zoom?: number;
	speed?: number;
	duration?: number;
	autoReenableDelay?: number | null;
}

export function useMapTracking(
	mapRef: React.RefObject<Map | null>,
	options: MapTrackingOptions = {}
) {
	const {
		zoom = 16,
		speed = 1.5,
		duration = 1000,
		autoReenableDelay = 30000, // 30 seconds
	} = options;

	const [isTracking, setIsTracking] = useState(true);
	const trackingTimeoutRef = useRef<number | null>(null);

	const centerOnUser = useCallback(
		(location: { lon: number; lat: number }) => {
			if (!mapRef.current) return;

			const currentZoom = mapRef.current.getZoom();
			const currentBearing = mapRef.current.getBearing();
			const currentPitch = mapRef.current.getPitch();

			mapRef.current.flyTo({
				center: [location.lon, location.lat],
				zoom: currentZoom,
				bearing: currentBearing,
				pitch: currentPitch,
				speed: 1.2,
				essential: true,
				duration: 800,
			});
		},
		[mapRef, zoom, speed, duration]
	);

	const toggleTracking = useCallback(
		(value?: boolean) => {
			const newValue = value ?? !isTracking;
			setIsTracking(newValue);

			if (trackingTimeoutRef.current) {
				window.clearTimeout(trackingTimeoutRef.current);
				trackingTimeoutRef.current = null;
			}

			if (!newValue && autoReenableDelay !== null) {
				trackingTimeoutRef.current = window.setTimeout(() => {
					setIsTracking(true);
				}, autoReenableDelay);
			}
		},
		[isTracking, autoReenableDelay]
	);

	const handleDragStart = useCallback(() => {
		if (isTracking) {
			toggleTracking(false);
		}
	}, [isTracking, toggleTracking]);

	useEffect(() => {
		return () => {
			if (trackingTimeoutRef.current) {
				window.clearTimeout(trackingTimeoutRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		map.on('dragstart', handleDragStart);

		return () => {
			map.off('dragstart', handleDragStart);
		};
	}, [mapRef, handleDragStart]);

	return {
		isTracking,
		toggleTracking,
		centerOnUser,
	};
}
