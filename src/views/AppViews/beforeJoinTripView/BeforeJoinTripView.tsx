import Button from '@/components/ui/Button';
import { navigationRoutes } from '@/Routes/routes';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '@/contexts/TripContext';
import { useAuthContext } from '@/contexts/AuthContext';
import useToggle from '@/hooks/useToggle';
import UserOrGuestModal from '@/components/UserOrGuestModal';
import { Trip } from '@/types/trip';

export default function BeforeJoinTripView() {
	const { trip, loadingTrip, errorTrip, tripId } = useTripContext();
	const { user } = useAuthContext();
	const nav = useNavigate();
	const { isOpen, setIsOpen } = useToggle();

	const handleOnjoin = () => {
		if (!user) {
			setIsOpen(true);
			return;
		}

		nav(`${navigationRoutes.map}`);
	};

	if (loadingTrip) return <p>Loading...</p>;

	if (errorTrip) {
		return <p>{errorTrip.message}</p>;
	}

	if (!tripId || !trip) {
		return (
			<div className='text-center'>
				<p>
					{!tripId
						? '⚠️ Oops! No trip was found.'
						: '🚨 Error: The trip could not be loaded.'}
				</p>
				<Button
					className='mt-5 w-full'
					onClick={() => nav(navigationRoutes.app)}
					primary
				>
					Go Home
				</Button>
			</div>
		);
	}

	const { name, description, reward, _id } = trip as Trip;

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
