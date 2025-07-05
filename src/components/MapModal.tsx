import Modal from './ui/Modal';
import GeneralMarker from '@/views/TripViews/mapView/components/Markers/GeneralMarker';
import Map from '@/views/TripViews/mapView/Map';
import StopMarker from '@/views/TripViews/mapView/components/Markers/StopMarker';
import { Types } from 'trip-track-package';
import MapRoute from '@/views/TripViews/mapView/components/RoutesAndNavigation/MapRoute';
import { useMapboxDirectionRoute } from '@/views/TripViews/mapView/hooks/useMapboxDirectionRoute';
import { useEffect, useMemo } from 'react';
import { Trip } from '@/types/trip';
import {
	MapContextProvider,
	useMapContext,
} from '@/contexts/MapContext/MapContext';

interface IMapModalProps {
	mapOpen: boolean;
	toggleMap: () => void;
	stops: Trip['stops'];
	disableExperiences?: true;
}

export default function MapModal({
	mapOpen,
	toggleMap,
	stops,
	disableExperiences,
}: IMapModalProps) {
	const points = useMemo(() => stops.map((stop) => stop.location), [stops]);

	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	return (
		<Modal open={mapOpen} center onBackdropClick={() => toggleMap()}>
			<div className='h-[80vh] w-[90vw] overflow-hidden rounded-2xl'>
				<MapContextProvider>
					<Map>
						<CenterOnFirstLocationStops stops={stops} />
						{routeData && <MapRoute id='modal-route' route={routeData} />}
						{stops.map((stop: Types['Trip']['Stop']['Model'], i) => (
							<GeneralMarker
								key={`${stop.location.lon}-${stop.location.lat}-${i}`}
								location={stop.location}
							>
								<StopMarker
									index={i}
									disableExperience={disableExperiences}
									isTripActive={false}
									stop={stop}
								/>
							</GeneralMarker>
						))}
					</Map>
				</MapContextProvider>
			</div>
		</Modal>
	);
}

function CenterOnFirstLocationStops({ stops }: { stops: Trip['stops'] }) {
	const { mapRef } = useMapContext();
	useEffect(() => {
		mapRef.current?.easeTo({
			center: stops[0].location,
			zoom: 12,
		});
	}, []);
	return null;
}
