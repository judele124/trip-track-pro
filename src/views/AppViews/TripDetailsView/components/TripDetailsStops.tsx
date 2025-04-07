import useToggle from '@/hooks/useToggle';
import StopsDetails from './StopsDetails';
import EditDetailsStops from './EditDetailsStops';
import { Trip } from '@/types/trip';
import { useAuthContext } from '@/contexts/AuthContext';

interface ITripDetailsProps {
	trip: Trip;
}

const TripDetailsStops = ({ trip }: ITripDetailsProps) => {
	const { user } = useAuthContext();
	const { isOpen: editMode, toggle: toggleEditMode } = useToggle();

	const isCreator = user?._id === trip.creator._id;
	if (isCreator && editMode) {
		return <EditDetailsStops trip={trip} />;
	}

	return (
		<StopsDetails
			isCreator={isCreator}
			toggleEditMode={toggleEditMode}
			stops={trip.stops}
		/>
	);
};

export default TripDetailsStops;
