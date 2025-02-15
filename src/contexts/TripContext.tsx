import { createContext, useContext, ReactNode, useState, FC } from 'react';
import { Types } from 'trip-track-package';

interface TripContextValue {
	trip: Types['Trip']['Model'] | null;
	setTrip: (trip: Types['Trip']['Model'] | null) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

interface TripProviderProps {
	children: ReactNode;
}

const TripProvider: FC<TripProviderProps> = ({ children }) => {
	const [trip, setTrip] = useState<Types['Trip']['Model'] | null>(null);

	return (
		<TripContext.Provider value={{ trip, setTrip }}>
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
