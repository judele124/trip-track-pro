import { useEffect, useRef, useState } from 'react';

interface IuseCurrentUserBearingProps {
	userLocation: { lat: number; lon: number };
}

export default function useCurrentUserBearing({
	userLocation,
}: IuseCurrentUserBearingProps): number {
	const lastLocation = useRef<null | { lat: number; lon: number }>(null);
	const [bearing, setBearing] = useState(0);

	useEffect(() => {
		if (!lastLocation.current) {
			lastLocation.current = userLocation;
			return;
		}

		const bearing = getBearing(
			lastLocation.current.lat,
			lastLocation.current.lon,
			userLocation.lat,
			userLocation.lon
		);

		setBearing(bearing);

		return () => {
			lastLocation.current = userLocation;
		};
	}, [userLocation]);

	return bearing;
}

function getBearing(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const toRadians = (deg: number) => (deg * Math.PI) / 180;
	const toDegrees = (rad: number) => (rad * 180) / Math.PI;

	const φ1 = toRadians(lat1);
	const φ2 = toRadians(lat2);
	const Δλ = toRadians(lon2 - lon1);

	const y = Math.sin(Δλ) * Math.cos(φ2);
	const x =
		Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

	const θ = Math.atan2(y, x);
	const bearing = (toDegrees(θ) + 360) % 360;

	return bearing;
}
