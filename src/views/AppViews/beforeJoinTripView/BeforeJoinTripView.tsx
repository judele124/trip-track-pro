import Button from '@/components/ui/Button';
import useAxios from '@/hooks/useAxios';
import useIdFromParamsOrNavigate from '@/hooks/useIdFromParamsOrNavigate';
import { navigationRoutes } from '@/Routes/routes';
import { tripGet } from '@/servises/tripService';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTripContext } from '@/contexts/TripContext';
import { Trip } from '@/types/trip';

export default function BeforeJoinTripView() {
	const { activate, data, status, loading, error } = useAxios({ manual: true });
	const tripId = useIdFromParamsOrNavigate(navigationRoutes.notFound);
	const { setTrip } = useTripContext();

	useEffect(() => {
		if (!tripId) return;
		tripGet(activate, tripId);
	}, [tripId]);

	useEffect(() => {
		if (!data) return;
		setTrip(data);
	}, [data]);

	if (!status || loading || error) {
		return <p>{loading ? 'Loading...' : error?.message}</p>;
	}

	const { name, description, reward }: Trip = data;
	return (
		<div className='flex flex-col gap-6'>
			<h1>
				You're invieted to join
				<span className='text-pretty text-primary'> {name} </span>
				trip
			</h1>

			<p
				style={{ scrollbarWidth: 'none' }}
				className='line-clamp-7 mt-2 overflow-y-scroll px-1 text-sm'
			>
				{description}
			</p>

			{reward && reward.image && (
				<div className='flex w-[65%] flex-col items-center self-center rounded-xl border border-primary bg-light p-2 dark:bg-secondary'>
					<p className='p-3 text-base font-medium'>{reward.title + ' 🏆 '}</p>
					<img
						src={reward.image}
						alt={reward.title}
						className='size-[65%] object-contain'
					/>
				</div>
			)}

			<Link to={`${navigationRoutes.trip}?tripId=${tripId}`}>
				<Button primary className='w-full'>
					join
				</Button>
			</Link>
		</div>
	);
}
