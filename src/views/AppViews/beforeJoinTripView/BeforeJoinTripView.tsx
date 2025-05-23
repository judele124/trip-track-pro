import { useTripContext } from '@/contexts/TripContext';
import { getErrorMessage } from '@/utils/errorMessages';
import Guides from './components/Guides';
import TripErrorState from './components/TripErrorState';
import Header from './components/Header';
import JoinButton from './components/Buttons';
import Reward from './components/Reward';
import ShowTripOnMapBtn from './components/ShowTripOnMapBtn';

export default function BeforeJoinTripView() {
	const { trip, loadingTrip, errorTrip, tripId, status } = useTripContext();

	if (loadingTrip) return <p>Loading...</p>;

	if (errorTrip && status) {
		return <p>{getErrorMessage(status)}</p>;
	}

	if (!tripId || !trip) {
		return <TripErrorState hasTripId={!!tripId} />;
	}

	const { name, description, reward } = trip;

	return (
		<div className='flex flex-col gap-4 overflow-y-auto'>
			<Header description={description || ''} name={name} />

			<Guides guides={trip.guides} />

			<Reward reward={reward} />

			<JoinButton trip={trip} />

			<ShowTripOnMapBtn trip={trip} />
		</div>
	);
}
