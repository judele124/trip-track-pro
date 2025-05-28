import { useEffect, useRef, useState, useCallback } from 'react';
import { Map } from 'mapbox-gl';

export function useMapTracking(mapRef: React.RefObject<Map | null>) {
	const [isTracking, setIsTracking] = useState(true);
	const trackingTimeoutRef = useRef<number | null>(null);

	const centerOnUser = useCallback(
		(location: { lon: number; lat: number }) => {
			if (!mapRef.current) return;

			mapRef.current.flyTo({
				center: [location.lon, location.lat],
				zoom: 16,
				speed: 1.5,
				essential: true,
				duration: 1000,
			});
		},
		[mapRef]
	);

	const toggleTracking = useCallback(() => {
		setIsTracking((prev) => !prev);
	}, []);

	const handleDragStart = useCallback(() => {
		if (isTracking) {
			setIsTracking(false);

			trackingTimeoutRef.current = window.setTimeout(() => {
				setIsTracking(true);
			}, 30000);
		}
	}, [isTracking]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		map.on('dragstart', handleDragStart);

		return () => {
			map.off('dragstart', handleDragStart);
			if (trackingTimeoutRef.current) {
				window.clearTimeout(trackingTimeoutRef.current);
			}
		};
	}, [mapRef, handleDragStart]);

	return {
		isTracking,
		toggleTracking,
		centerOnUser,
	};
}
