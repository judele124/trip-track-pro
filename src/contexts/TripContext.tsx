import { MapBoxDirectionsResponse } from '@/types/map';
import { createContext, useContext, ReactNode, useState, FC } from 'react';
import { Types } from 'trip-track-package';

interface TripContextValue {
	trip: Types['Trip']['Model'] | null;
	setTrip: (trip: Types['Trip']['Model'] | null) => void;
	tripRoute: MapBoxDirectionsResponse | null;
	setTripRoute: (tripRoute: MapBoxDirectionsResponse) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

interface TripProviderProps {
	children: ReactNode;
}

const TripProvider: FC<TripProviderProps> = ({ children }) => {
	const [trip, setTrip] = useState<Types['Trip']['Model'] | null>(null);
	const [tripRoute, setTripRoute] = useState<null | MapBoxDirectionsResponse>(
		null
	);

	return (
		<TripContext.Provider value={{ trip, setTrip, tripRoute, setTripRoute }}>
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
