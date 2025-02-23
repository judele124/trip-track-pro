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
		navigator.geolocation.watchPosition((pos) => {
			setUserCurrentLocation({
				lon: pos.coords.longitude,
				lat: pos.coords.latitude,
			});
		});

		return () => {
			clearInterval(currentUserLocationInterval.current);
		};
	}, []);
	
	return userCurrentLocation;
}
