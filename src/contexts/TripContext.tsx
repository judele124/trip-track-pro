import useAxios from '@/hooks/useAxios';
import {
	createContext,
	useContext,
	ReactNode,
	useState,
	FC,
	useEffect,
} from 'react';
import useTripId from '@/hooks/useTripId';
import { tripGet } from '@/servises/tripService';
import { Trip } from '@/types/trip';

interface TripContextValue {
	trip: Trip | null;
	setTrip: (trip: Trip | null) => void;
	loadingTrip: boolean;
	errorTrip: Error | null;
	tripId: string;
	status: number | undefined;
}

const TripContext = createContext<TripContextValue | null>(null);

interface TripProviderProps {
	children: ReactNode;
}

const TripProvider: FC<TripProviderProps> = ({ children }) => {
	const tripId = useTripId();
	const [trip, setTrip] = useState<Trip | null>(null);

	const {
		activate,
		loading: loadingTrip,
		error: errorTrip,
		status,
	} = useAxios<Trip>({
		manual: true,
		onSuccess: ({ data }) => data && setTrip(data),
	});

	useEffect(() => {
		if (tripId && !trip) tripGet(activate, tripId);
	}, [tripId]);

	return (
		<TripContext.Provider
			value={{
				trip,
				setTrip,
				loadingTrip,
				errorTrip,
				tripId,
				status,
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
