import Modal from './ui/Modal';
import GeneralMarker from '@/views/TripViews/mapView/components/Markers/GeneralMarker';
import Map from '@/views/TripViews/mapView/Map';
import StopMarker from '@/views/TripViews/mapView/components/Markers/StopMarker';
import { MapBoxDirectionsResponse } from '@/types/map';
import { Types } from 'trip-track-package';
import MapRoute from '@/views/TripViews/mapView/components/RoutesAndNavigation/MapRoute';

interface IMapModalProps {
	mapOpen: boolean;
	toggleMap: () => void;
	routeData: MapBoxDirectionsResponse | null | undefined;
	stops: Types['Trip']['Stop']['Model'][];
	disableExperiences?: true;
}

export default function MapModal({
	mapOpen,
	toggleMap,
	stops,
	disableExperiences,
	routeData,
}: IMapModalProps) {
	return (
		<Modal open={mapOpen} center onBackdropClick={() => toggleMap()}>
			<div className='h-[80vh] w-[90vw] overflow-hidden rounded-2xl'>
				<Map>
					{routeData && <MapRoute id='modal-route' route={routeData} />}
					{stops.map((stop: Types['Trip']['Stop']['Model'], i) => (
						<GeneralMarker
							key={`${stop.location.lon}-${stop.location.lat}-${i}`}
							location={stop.location}
						>
							<StopMarker
								index={i}
								disableExperience={disableExperiences}
								stop={stop}
							/>
						</GeneralMarker>
					))}
				</Map>
			</div>
		</Modal>
	);
}
