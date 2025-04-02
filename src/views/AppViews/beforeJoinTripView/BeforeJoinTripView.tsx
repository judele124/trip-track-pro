import Button from '@/components/ui/Button';
import { navigationRoutes } from '@/Routes/routes';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '@/contexts/TripContext';
import { useAuthContext } from '@/contexts/AuthContext';
import useToggle from '@/hooks/useToggle';
import UserOrGuestModal from '@/components/UserOrGuestModal';
import TripNotActiveMessage from '@/components/TripNotActiveMessage';
import TripCancelledMessage from '@/components/TripCancelledMessage';

export default function BeforeJoinTripView() {
	const { trip, loadingTrip, errorTrip, tripId } = useTripContext();
	const { user } = useAuthContext();
	const nav = useNavigate();
	const {
		isOpen: isUserOrGuestModalOpen,
		setIsOpen: setIsUserOrGuestModalOpen,
	} = useToggle();
	const { isOpen: isTripNotActiveOpen, setIsOpen: setIsTripNotActiveOpen } =
		useToggle();

	const { isOpen: isTripCancelledOpen, setIsOpen: setIsTripCancelledOpen } =
		useToggle();

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

	const { name, description, reward, _id } = trip;

	const handleOnjoin = () => {
		if (trip.status === 'cancelled') {
			setIsTripCancelledOpen(true);
			return;
		}

		if (trip.status !== 'started') {
			setIsTripNotActiveOpen(true);
			return;
		}

		if (!user) {
			setIsUserOrGuestModalOpen(true);
			return;
		}

		nav(`${navigationRoutes.map}`);
	};

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
				open={isUserOrGuestModalOpen}
				onClose={() => setIsUserOrGuestModalOpen(false)}
			/>

			<TripNotActiveMessage
				trip={trip}
				onClose={() => setIsTripNotActiveOpen(false)}
				isOpen={isTripNotActiveOpen}
			/>

			<TripCancelledMessage
				trip={trip}
				onClose={() => setIsTripCancelledOpen(false)}
				isOpen={isTripCancelledOpen}
			/>

			<Button onClick={handleOnjoin} primary className='w-full'>
				join
			</Button>
		</div>
	);
}
