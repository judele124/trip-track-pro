import Button from '@/components/ui/Button';
import { navigationRoutes } from '@/Routes/routes';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '@/contexts/TripContext';
import { useAuthContext } from '@/contexts/AuthContext';
import useToggle from '@/hooks/useToggle';
import UserOrGuestModal from '@/components/UserOrGuestModal';
import TripNotActiveMessage from '@/components/TripNotActiveMessage';
import TripCancelledMessage from '@/components/TripCancelledMessage';
import { joinTrip } from '@/servises/tripService';
import useAxios from '@/hooks/useAxios';
import { getErrorMessage } from '@/utils/errorMessages';
import MapModal from '@/components/MapModal';
import { useMapboxDirectionRoute } from '@/views/TripViews/mapView/hooks/useMapboxDirectionRoute';
import { useMemo } from 'react';
import { Types } from 'trip-track-package';
import { Trip } from '@/types/trip';

export default function BeforeJoinTripView() {
	const { trip, loadingTrip, errorTrip, tripId, status } = useTripContext();
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

	const { activate } = useAxios({
		manual: true,
	});

	const { isOpen: mapOpen, toggle: toggleMap } = useToggle();

	if (loadingTrip) return <p>Loading...</p>;

	if (errorTrip && status) {
		return <p>{getErrorMessage(status)}</p>;
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

	const handleOnjoin = async () => {
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

		await joinTrip(activate, tripId, {
			name: user?.name,
			imageUrl: user?.imageUrl,
			role: user?.role,
		});

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

			{mapOpen && <ShowTripOnMapBtn trip={trip} toggleMap={toggleMap} />}

			<Button onClick={handleOnjoin} primary className='w-full'>
				join
			</Button>

			<Button
				className='bg-transparent text-sm text-dark underline dark:text-light'
				onClick={toggleMap}
			>
				Show trip on map
			</Button>
		</div>
	);
}

interface IShowTripOnMapBtnProps {
	trip: Trip;
	toggleMap: () => void;
}

const ShowTripOnMapBtn = ({ trip, toggleMap }: IShowTripOnMapBtnProps) => {
	const points = useMemo(
		() =>
			trip?.stops.map(
				(stop: Types['Trip']['Stop']['Model']) => stop.location
			) || [],
		[trip]
	);

	const { routeData } = useMapboxDirectionRoute({
		points,
	});
	return (
		<MapModal
			key={`map-modal-${trip._id}`}
			mapOpen={true}
			toggleMap={toggleMap}
			disableExperiences
			routeData={routeData}
			stops={trip.stops}
		/>
	);
};
