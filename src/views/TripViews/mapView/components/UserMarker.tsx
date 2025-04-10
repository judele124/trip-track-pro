import useMarker from '../hooks/useMarker';
import { useRef } from 'react';
import { useMapContext } from '@/contexts/MapContext';

export default function UserMarker({
	location,
}: {
	location: { lon: number; lat: number };
}) {
	const { isMapReady, mapRef } = useMapContext();
	const marketElementRef = useRef(
		(() => {
			const userIcon = document.createElement('div');
			userIcon.innerHTML = `
			  <svg width="30" height="30" fill="#000" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
				<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm89.6 32h-11.8c-22.2 10.3-46.9 16-73.8 16s-51.6-5.7-73.8-16h-11.8C64.5 288 0 352.5 0 432c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48 0-79.5-64.5-144-134.4-144z"/>
			  </svg>
			`;
			userIcon.className =
				'flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md';
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
