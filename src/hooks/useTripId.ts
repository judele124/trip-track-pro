import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useParamFromURL from './useParamFromURL';

function useTripId(): string {
	const [tripIdFromStorage, setTripIdFromStorage] = useLocalStorage(
		'tripId',
		''
	);
	const tripIdFromParams = useParamFromURL('tripId');
	const [finalTripId, setFinalTripId] = useState<string>('');

	useEffect(() => {
		if (tripIdFromParams) {
			setFinalTripId(tripIdFromParams);
			setTripIdFromStorage(tripIdFromParams);
		} else if (tripIdFromStorage) {
			setFinalTripId(tripIdFromStorage);
		} else {
			setFinalTripId('');
		}
	}, [tripIdFromParams, tripIdFromStorage, setTripIdFromStorage]);

	return finalTripId;
}

export default useTripId;
