import TripDetailsStops from '../TripDetailsStops';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';

export function TestUI() {
	const { data } = useAxios({
		url: `${API_BASE_URL}/trip/67af347857b476b376e24b01`,
		method: 'get',
	});

	return <>{data && <TripDetailsStops tripStops={data.stops} />}</>;
}
