import Button from '@/components/ui/Button';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import TripsList from './TripsList';
import { useState } from 'react';

const filterList = ['createdTrips', 'joinedTrips'] as const;

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

	const [filter, setFilter] = useState<(typeof filterList)[number]>(
		filterList[0]
	);

	return (
		<>
			{/* buttons */}
			<div className='mt-2'>
				<Button
					onClick={() => setFilter('createdTrips')}
					primary={filter === 'createdTrips'}
					className={`mr-2 rounded-lg px-2 py-1 text-sm font-normal text-white dark:text-dark ${filter === 'createdTrips' ? 'dark:text-white' : ''}`}
				>
					Created trips
				</Button>
				<Button
					onClick={() => setFilter('joinedTrips')}
					primary={filter === 'joinedTrips'}
					className={`rounded-lg px-2 py-1 text-sm font-normal text-white dark:text-dark ${filter === 'joinedTrips' ? 'dark:text-white' : ''}`}
				>
					Joined trips
				</Button>
			</div>

			{/* heading */}
			<h3 className='py-3'>
				{filter === 'createdTrips' ? 'Created Trips' : 'Joined trips'}
			</h3>

			<div className='no-scrollbar flex h-full w-full flex-col gap-2 overflow-y-auto'>
				{!createdTripsLoading && (
					<TripsList
						data={
							filter === 'createdTrips' ? createdTripsData : joinedTripsData
						}
						loading={
							filter === 'createdTrips'
								? createdTripsLoading
								: joinedTripsLoading
						}
						status={
							filter === 'createdTrips' ? createdTripsStatus : joinedTripsStatus
						}
						hasError={
							(filter === 'createdTrips'
								? createdTripsError
								: joinedTripsError) != undefined
						}
					/>
				)}
			</div>
		</>
	);
}
