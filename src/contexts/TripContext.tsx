import useAxios from '@/hooks/useAxios';
import { MapBoxDirectionsResponse } from '@/types/map';
import {
	createContext,
	useContext,
	ReactNode,
	useState,
	FC,
	useEffect,
} from 'react';
import { Types } from 'trip-track-package';
import useTripId from '@/hooks/useTripId';
import { tripGet } from '@/servises/tripService';

interface TripContextValue {
	trip: Types['Trip']['Model'] | null;
	setTrip: (trip: Types['Trip']['Model'] | null) => void;
	tripRoute: MapBoxDirectionsResponse | null;
	setTripRoute: (tripRoute: MapBoxDirectionsResponse) => void;
	loadingTrip: boolean;
	errorTrip: Error | null;
	tripId: string;
}

const TripContext = createContext<TripContextValue | null>(null);

interface TripProviderProps {
	children: ReactNode;
}

const TripProvider: FC<TripProviderProps> = ({ children }) => {
	const tripId = useTripId();
	const [trip, setTrip] = useState<Types['Trip']['Model'] | null>(null);
	const [tripRoute, setTripRoute] = useState<null | MapBoxDirectionsResponse>(
		null
	);

	const {
		activate,
		loading: loadingTrip,
		error: errorTrip,
	} = useAxios({
		manual: true,
		onSuccess: ({ data }) => setTrip(data),
	});

	useEffect(() => {
		if (tripId) tripGet(activate, tripId);
	}, [tripId]);

	return (
		<TripContext.Provider
			value={{
				trip,
				setTrip,
				tripRoute,
				setTripRoute,
				loadingTrip,
				errorTrip,
				tripId,
			}}
		>
			{children}
		</TripContext.Provider>
	);
};

export default TripProvider;

export const useTripContext = () => {
	const context = useContext(TripContext);
	if (!context) {
		throw new Error('useTripContext must be used within a TripProvider');
	}
	return context;
};
