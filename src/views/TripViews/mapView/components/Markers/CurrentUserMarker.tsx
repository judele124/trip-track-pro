import { useEffect } from 'react';
import { useMap } from '../../Map';
import GeneralMarker from './GeneralMarker';
import { IUserResponseData } from '@/types/user';

interface IUserMarkerProps {
	location: { lon: number; lat: number };
	user: IUserResponseData;
}

export default function CurrentUserMarker({
	location,
	user,
}: IUserMarkerProps) {
	const { isMapReady, mapRef } = useMap();

	useEffect(() => {
		if (!mapRef.current || !isMapReady || !location) return;
		mapRef.current.easeTo({
			center: [location.lon, location.lat],
			duration: 1000,
			easing: (t) => t,
			zoom: 18,
		});
	}, [isMapReady, location]);
	return (
		<GeneralMarker
			location={location}
			childrenAsInnerHtmlString={`
				<div class="relative flex flex-col items-center justify-center">
					<span class="text-xs absolute bottom-[110%] left-1/2 -translate-x-1/2 text-dark font-semibold">${user.name || 'Default'}</span>
					<img class="w-10 h-10 object-cover bg-secondary rounded-full shadow-md" src="${user.imageUrl || `https://robohash.org/${user.name}.png`}" />
				</div>
			`}
		/>
	);
}
