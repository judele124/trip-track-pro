import { getBearing } from '@/utils/map.functions';
import { useEffect, useRef, useState } from 'react';

interface IuseCurrentUserBearingProps {
	userLocation: { lat: number; lon: number } | null;
}

export default function useCurrentUserBearing({
	userLocation,
}: IuseCurrentUserBearingProps): number {
	const lastLocation = useRef<null | { lat: number; lon: number }>(null);
	const [bearing, setBearing] = useState(0);

	useEffect(() => {
		if (!userLocation) return;

		if (!lastLocation.current) {
			lastLocation.current = userLocation;
			return;
		}

		const bearing = getBearing(
			[lastLocation.current.lon, lastLocation.current.lat],
			[userLocation.lon, userLocation.lat]
		);

		setBearing(bearing);

		return () => {
			lastLocation.current = userLocation;
		};
	}, [userLocation]);

	return bearing;
}
