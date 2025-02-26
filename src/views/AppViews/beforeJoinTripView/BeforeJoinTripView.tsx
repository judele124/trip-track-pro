import Button from '@/components/ui/Button';
import useAxios from '@/hooks/useAxios';
import useIdFromParamsOrNavigate from '@/hooks/useIdFromParamsOrNavigate';
import { navigationRoutes } from '@/Routes/routes';
import { tripGet } from '@/servises/tripService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '@/types/trip';
import { useTripContext } from '@/contexts/TripContext';
import { useAuthContext } from '@/contexts/AuthContext';
import useToggle from '@/hooks/useToggle';
import UserOrGuestModal from '@/components/UserOrGuestModal';

export default function BeforeJoinTripView() {
	const {
		activate,
		data: tripData,
		status,
		loading,
		error,
	} = useAxios({ manual: true });

	const tripId = useIdFromParamsOrNavigate(navigationRoutes.notFound);
	const { setTrip, trip } = useTripContext();
	const { user } = useAuthContext();
	const nav = useNavigate();
	const { isOpen, setIsOpen } = useToggle();

	useEffect(() => {
		if (!tripId || trip) return;
		tripGet(activate, tripId);
	}, [tripId]);

	useEffect(() => {
		if (!tripData) return;
		setTrip(tripData);
	}, [tripData]);

	const handleOnjoin = () => {
		if (!user) {
			setIsOpen(true);
			return;
		}

		nav(`${navigationRoutes.trip}?tripId=${tripId}`);
	};

	if (!status || loading || error) {
		return <p>{loading ? 'Loading...' : error?.message}</p>;
	}

	const { name, description, reward, _id }: Trip = tripData;

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

			{reward?.image && (
				<div className='flex w-[65%] flex-col items-center self-center rounded-xl border border-primary bg-light p-2 dark:bg-secondary'>
					<p className='p-3 text-base font-medium'>{reward.title + ' 🏆 '}</p>
					<img
						src={reward.image}
						alt={reward.title}
						className='size-[65%] object-contain'
					/>
				</div>
			)}

			<UserOrGuestModal
				tripId={_id.toString()}
				open={isOpen}
				onClose={() => setIsOpen(false)}
			/>
			<Button onClick={handleOnjoin} primary className='w-full'>
				join
			</Button>
		</div>
	);
}
