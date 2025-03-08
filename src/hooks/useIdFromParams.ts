import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useIdFromParams(fallbackfun: () => void) {
	const [searchParams, _] = useSearchParams();

	useEffect(() => {
		const tripId = searchParams.get('tripId');
		if (!tripId) {
			fallbackfun();
		}
	}, [searchParams]);

	return searchParams.get('tripId');
}
