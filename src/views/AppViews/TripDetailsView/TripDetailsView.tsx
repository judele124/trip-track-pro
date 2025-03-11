import Icon from '@/components/icons/Icon';
import MapModal from '@/components/MapModal';
import TripDetailsStops from '@/components/TripDetailsStops';
import Button from '@/components/ui/Button';
import { API_BASE_URL } from '@/env.config';
import useAxios from '@/hooks/useAxios';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { getErrorMessage } from '@/utils/errorMessages';
import { useMapboxDirectionRoute } from '@/views/TripViews/mapView/hooks/useMapboxDirectionRoute';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Types } from 'trip-track-package';

export default function TripDetailsView() {
	const { isOpen: mapOpen, toggle: toggleMap } = useToggle();
	const params = useParams();
	const { data, loading, error, status } = useAxios({
		url: `${API_BASE_URL}/trip/${params.tripId}`,
		method: 'get',
	});

	const points = useMemo(
		() =>
			data?.stops.map(
				(stop: Types['Trip']['Stop']['Model']) => stop.location
			) || [],
		[data]
	);

	const { routeData } = useMapboxDirectionRoute({
		points,
		runGetDirectionsRoute: mapOpen,
	});

	if (!data) return null;

	const { name, status: tripStatus, stops } = data as Trip;

	return (
		<>
			<div className='page-colors mx-auto h-full max-w-[400px]'>
				{loading && <Icon name='spinner' />}
				{error && status && (
					<p className='text-res-500'>{getErrorMessage(status)}</p>
				)}
				<h1>{name}</h1>
				{/* need to replace with status btn from profile page */}
				<Button>{tripStatus}</Button>

				<h3>Stops</h3>
				<TripDetailsStops tripStops={stops} />

				<Button
					className='w-full bg-transparent text-dark underline dark:text-light'
					onClick={toggleMap}
				>
					Show on map
				</Button>
			</div>
			<MapModal
				disableExperiences
				mapOpen={mapOpen}
				toggleMap={toggleMap}
				routeData={routeData}
				stops={stops}
			/>
		</>
	);
}
