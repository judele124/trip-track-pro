import { useEffect, useRef, useState } from 'react';

interface IUseCurrentUserLocationProps {
	onLocationUpdate: (location: { lon: number; lat: number }) => void;
}

export default function useCurrentUserLocation({
	onLocationUpdate,
}: IUseCurrentUserLocationProps) {
	const [userCurrentLocation, setUserCurrentLocation] = useState<null | {
		lon: number;
		lat: number;
	}>(null);
	const currentUserLocationInterval = useRef<number>();

	useEffect(() => {
		currentUserLocationInterval.current = setInterval(() => {
			navigator.geolocation.getCurrentPosition(
				({ coords: { longitude: lon, latitude: lat } }) => {
					onLocationUpdate({ lon, lat });
					setUserCurrentLocation({ lon, lat });
				},
				(err) => {
					console.error(err);
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 10000,
				}
			);
		}, 5000);

		return () => {
			clearInterval(currentUserLocationInterval.current);
		};
	}, []);
	return userCurrentLocation;
}
