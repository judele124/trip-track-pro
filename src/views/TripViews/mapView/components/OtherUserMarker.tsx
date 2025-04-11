import { useRef } from 'react';
import useMarker from '../hooks/useMarker';
import { useMap } from '../Map';

interface IOtherUserMarkerProps {
	location: { lon: number; lat: number };
}
export default function OtherUserMarker({ location }: IOtherUserMarkerProps) {
	const { isMapReady, mapRef } = useMap();
	const marketElementRef = useRef(
		(() => {
			const userIcon = document.createElement('div');

			userIcon.className =
				'flex items-center justify-center size-3 bg-red-500 rounded-full shadow-md';

			return userIcon;
		})()
	);

	useMarker({
		ref: marketElementRef,
		isMapReady,
		mapRef,
		location,
	});
	return <></>;
}
