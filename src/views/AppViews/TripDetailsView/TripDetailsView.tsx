import Icon from '@/components/icons/Icon';
import MapModal from '@/components/MapModal';
import TripDetailsStops from '@/components/TripDetailsStops';
import Button from '@/components/ui/Button';
import useAxios from '@/hooks/useAxios';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { getErrorMessage } from '@/utils/errorMessages';
import { useMapboxDirectionRoute } from '@/views/TripViews/mapView/hooks/useMapboxDirectionRoute';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Types } from 'trip-track-package';
import TripStatusButton from '../profileView/components/TripStatusButton';
import RewardDetails from './components/RewardDetails';
import { useAuthContext } from '@/contexts/AuthContext';
import { tripGet } from '@/servises/tripService';

export default function TripDetailsView() {
	const { user } = useAuthContext();
	const { isOpen: mapOpen, toggle: toggleMap } = useToggle();
	const params = useParams();
	const { data, loading, error, status, activate } = useAxios({
		manual: true,
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

	useEffect(() => {
		if (!params.tripId) return;
		tripGet(activate, params.tripId);
	}, []);

	if (!data) return null;

	const {
		name,
		status: tripStatus,
		stops,
		creator,
		_id: tripId,
	} = data as Trip;

	return (
		<>
			<div className='page-colors mx-auto flex h-full max-w-[400px] flex-col gap-4'>
				{loading && <Icon name='spinner' />}
				{error && status && (
					<p className='text-res-500'>{getErrorMessage(status)}</p>
				)}
				<div>
					<h1 className='text- max-w-[70%] break-words capitalize'>{name}</h1>
					<div className='flex gap-1'>
						<TripStatusButton status={tripStatus} />
						<RewardDetails
							reward={data.reward}
							onUpdate={() => {
								if (!params.tripId) return;
								tripGet(activate, tripId);
							}}
							tripId={tripId}
						/>
					</div>
				</div>

				<TripDetailsStops tripStops={stops} isCreator={user?._id === creator} />

				<Button
					className='bg-transparent text-dark underline dark:text-light'
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
