import MapModal from '@/components/MapModal';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { useMapboxDirectionRoute } from '@/views/TripViews/mapView/hooks/useMapboxDirectionRoute';
import { useMemo } from 'react';

interface IShowTripOnMapBtnProps {
	trip: Trip;
}

export default function ShowTripOnMapBtn({ trip }: IShowTripOnMapBtnProps) {
	const { isOpen: mapOpen, toggle: toggleMap } = useToggle();

	const points = useMemo(
		() => trip?.stops.map((stop: Trip['stops'][number]) => stop.location) || [],
		[trip]
	);

	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	return (
		<>
			<Button
				className='bg-transparent text-sm text-dark underline dark:text-light'
				onClick={toggleMap}
			>
				Show trip on map
			</Button>

			<MapModal
				key={`map-modal-${trip._id}`}
				mapOpen={mapOpen}
				toggleMap={toggleMap}
				disableExperiences
				routeData={routeData}
				stops={trip.stops}
			/>
		</>
	);
}
