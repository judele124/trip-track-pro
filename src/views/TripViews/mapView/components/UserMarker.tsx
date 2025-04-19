import useMarker from '../hooks/useMarker';
import { useRef } from 'react';
import { useMap } from '../Map';
import { IUserResponseData } from '@/types/user';

export default function UserMarker({
	location,
	user,
}: {
	location: { lon: number; lat: number };
	user: IUserResponseData;
}) {
	const { isMapReady, mapRef } = useMap();
	const marketElementRef = useRef(
		(() => {
			const userIconContainer = document.createElement('div');
			userIconContainer.className =
				'flex flex-col items-center justify-center w-8  rounded-full shadow-md';

			const userImage = document.createElement('img');
			userImage.className =
				'w-full aspect-square object-cover bg-secondary rounded-full';
			userImage.src = user.imageUrl || `https://robohash.org/${user.name}.png`;

			const userName = document.createElement('span');
			userName.className = 'text-xs dark:text-white text-dark';
			userName.textContent = user.name || 'Default';

			userIconContainer.appendChild(userName);
			userIconContainer.appendChild(userImage);

			return userIconContainer;
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
