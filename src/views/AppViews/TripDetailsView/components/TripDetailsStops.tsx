import useToggle from '@/hooks/useToggle';
import { Types } from 'trip-track-package';
import StopsDetails from './StopsDetails';
import EditDetailsStops from './EditDetailsStops';

interface ITripDetailsProps {
	tripStops: Types['Trip']['Stop']['Model'][];
	isCreator?: boolean;
}

const TripDetailsStops = ({ tripStops }: ITripDetailsProps) => {
	const { isOpen: editMode, toggle: toggleEditMode } = useToggle();

	if (editMode) {
		return <EditDetailsStops stops={tripStops} />;
	}

	return <StopsDetails toggleEditMode={toggleEditMode} stops={tripStops} />;
};

export default TripDetailsStops;
