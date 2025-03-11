import Modal from './ui/Modal';
import GeneralMarker from '@/views/TripViews/mapView/components/GeneralMarker';
import Map from '@/views/TripViews/mapView/Map';
import StopMarker from '@/views/TripViews/mapView/components/StopMarker';
import { MapBoxDirectionsResponse } from '@/types/map';
import { Types } from 'trip-track-package';

interface IMapModalProps {
	mapOpen: boolean;
	toggleMap: () => void;
	routeData: MapBoxDirectionsResponse | null;
	stops: Types['Trip']['Stop']['Model'][];
	disableExperiences?: true;
}

export default function MapModal({
	mapOpen,
	toggleMap,
	routeData,
	stops,
	disableExperiences,
}: IMapModalProps) {
	return (
		<Modal
			open={mapOpen}
			center
			onBackdropClick={() => toggleMap()}
			containerClassName='h-[80dvh] w-[90dvw] overflow-hidden rounded-2xl'
		>
			<Map mapboxDirectionRoute={routeData}>
				{stops.map((stop: Types['Trip']['Stop']['Model']) => (
					<GeneralMarker location={stop.location}>
						<StopMarker disableExperience={disableExperiences} stop={stop} />
					</GeneralMarker>
				))}
			</Map>
		</Modal>
	);
}
