import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import TripsList from './TripsList';

export default function TripsShowcase() {
	const {
		data: createdTripsData,
		loading: createdTripsLoading,
		error: createdTripsError,
		status: createdTripsStatus,
	} = useAxios({
		url: `${API_BASE_URL}/trip/getAll`,
	});
	const {
		data: joinedTripsData,
		loading: joinedTripsLoading,
		error: joinedTripsError,
		status: joinedTripsStatus,
	} = useAxios({
		url: `${API_BASE_URL}/trip/user-in-participants`,
	});

	const { isOpen: showCreatedTrips, toggle: toggleShowCreatedTrip } =
		useToggle(true);

	return (
		<>
			{/* buttons */}
			<div className='mt-2'>
				<Button
					onClick={toggleShowCreatedTrip}
					primary={showCreatedTrips}
					className={`mr-2 rounded-lg px-2 py-1 text-sm font-normal text-white dark:text-dark ${showCreatedTrips ? 'dark:text-white' : ''}`}
				>
					Created trips
				</Button>
				<Button
					onClick={toggleShowCreatedTrip}
					primary={!showCreatedTrips}
					className={`rounded-lg px-2 py-1 text-sm font-normal text-white dark:text-dark ${!showCreatedTrips ? 'dark:text-white' : ''}`}
				>
					Joined trips
				</Button>
			</div>

			{/* heading */}
			<h3 className='py-3'>
				{showCreatedTrips ? 'Created Trips' : 'Joined trips'}
			</h3>

			<div className='no-scrollbar flex h-full w-full flex-col gap-2 overflow-y-auto'>
				{!createdTripsLoading && (
					<TripsList
						data={showCreatedTrips ? createdTripsData : joinedTripsData}
						loading={
							showCreatedTrips ? createdTripsLoading : joinedTripsLoading
						}
						status={showCreatedTrips ? createdTripsStatus : joinedTripsStatus}
						hasError={
							(showCreatedTrips ? createdTripsError : joinedTripsError) !=
							undefined
						}
					/>
				)}
			</div>
		</>
	);
}
