import Icon from '@/components/icons/Icon';
import MapModal from '@/components/MapModal';
import TripDetailsStops from '@/views/AppViews/TripDetailsView/components/TripDetailsStops';
import Button from '@/components/ui/Button';
import useAxios, { UseAxiosResponse } from '@/hooks/useAxios';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { getErrorMessage } from '@/utils/errorMessages';
import { useMapboxDirectionRoute } from '@/views/TripViews/mapView/hooks/useMapboxDirectionRoute';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Types } from 'trip-track-package';
import TripStatusButton from '../profileView/components/TripStatusButton';
import RewardDetails from './components/RewardDetails';
import { tripGet } from '@/servises/tripService';
import UpdateGuidesBtn from '@/components/updateGuidesBtn/UpdateGuidesBtn';

export default function TripDetailsView() {
	const { isOpen: mapOpen, toggle: toggleMap } = useToggle();
	const params = useParams();
	const { data, loading, error, status, activate } = useAxios<Trip>({
		manual: true,
	});

	const tripData = data as Trip | undefined;

	const points = useMemo(
		() =>
			tripData?.stops.map(
				(stop: Types['Trip']['Stop']['Model']) => stop.location
			) || [],
		[tripData]
	);

	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	useEffect(() => {
		if (!params.tripId) return;
		tripGet(activate, params.tripId);
	}, []);

	return (
		<>
			<div className='page-colors mx-auto flex h-full w-full max-w-[400px] flex-col gap-4 overflow-hidden'>
				{loading && <Icon name='spinner' />}
				{error && status && (
					<p className='text-res-500'>{getErrorMessage(status)}</p>
				)}
				{tripData && (
					<>
						<TripDetailsHeader
							tripData={tripData}
							activate={activate}
							tripId={params.tripId}
						/>

						<TripDetailsStops
							getUpdatedTrip={async () => {
								if (!params.tripId) return;
								tripGet(activate, params.tripId);
							}}
							trip={tripData}
						/>

						<Button
							className='bg-transparent text-dark underline dark:text-light'
							onClick={toggleMap}
						>
							Show on map
						</Button>
					</>
				)}
			</div>
			{tripData && (
				<MapModal
					disableExperiences
					mapOpen={mapOpen}
					toggleMap={toggleMap}
					routeData={routeData}
					stops={tripData.stops}
				/>
			)}
		</>
	);
}

function TripDetailsHeader({
	tripData,
	activate,
	tripId,
}: {
	tripData: Trip;
	activate: UseAxiosResponse<Trip>['activate'];
	tripId: string | undefined;
}) {
	return (
		<div>
			<h1 className='max-w-[70%] break-words capitalize'>{tripData.name}</h1>
			{tripData.description && <p>{tripData.description}</p>}
			<div className='mt-2 flex items-start gap-1'>
				<TripStatusButton status={tripData.status} />
				<RewardDetails
					reward={tripData.reward}
					onUpdate={() => tripId && tripGet(activate, tripId)}
					tripId={tripData._id}
				/>
			</div>
			<h4 className='my-2'>Guides</h4>
			<div className='flex items-center justify-between'>
				<div className='flex gap-2 overflow-x-scroll'>
					{!tripData.guides.length && (
						<p className='text-center'>No guides yet</p>
					)}

					{tripData.guides.map((guide) => (
						<div
							className='flex shrink-0 items-center gap-2 rounded-2xl bg-secondary px-4 py-2 text-white'
							key={guide._id}
						>
							<img
								className='size-6 rounded-full border bg-white'
								src={guide.imageUrl}
							/>
							<p className='text-sm capitalize'>{guide.name}</p>
						</div>
					))}
				</div>
				<UpdateGuidesBtn
					trip={tripData}
					onSuccess={() => tripId && tripGet(activate, tripId)}
				/>
			</div>
		</div>
	);
}
