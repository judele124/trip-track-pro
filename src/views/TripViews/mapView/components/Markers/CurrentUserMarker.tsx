import { useEffect } from 'react';
import { useMapContext } from '@/contexts/MapContext/MapContext';
import GeneralMarker from './GeneralMarker';
import { IUserResponseData } from '@/types/user';
import { useMapTracking } from '../../hooks/useMapTracking';
import { TrackingToggle } from '../MapControls/TrackingToggle';

interface IUserMarkerProps {
	location: { lon: number; lat: number };
	user: IUserResponseData;
}
export default function CurrentUserMarker({
	location,
	user,
}: IUserMarkerProps) {
	const { isMapReady } = useMapContext();
	const { isTracking, toggleTracking, centerOnUser } = useMapTracking();

	useEffect(() => {
		if (!isMapReady || !location || !isTracking) return;
		centerOnUser(location);
	}, [isMapReady, location, isTracking, centerOnUser]);

	return (
		<>
			<GeneralMarker
				location={location}
				childrenAsInnerHtmlString={`
			<div class="relative flex flex-col items-center justify-center">
			  <span class="text-xs absolute bottom-[110%] left-1/2 -translate-x-1/2 text-dark font-semibold">${user.name || 'Default'}</span>
			  <img class="w-10 h-10 object-cover bg-secondary rounded-full shadow-md" src="${user.imageUrl || `https://robohash.org/${user.name}.png`}" />
			</div>
		  `}
			/>
			<TrackingToggle isTracking={isTracking} onToggle={toggleTracking} />
		</>
	);
}
