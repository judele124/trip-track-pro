import useToggle from '@/hooks/useToggle';
import { useAuthContext } from '@/contexts/AuthContext';
import { Fragment, useEffect } from 'react';
import TripDetails from '../TripDetails';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';

export function TestUI() {
	const { user } = useAuthContext();
	const { data, error, loading } = useAxios({
		url: `${API_BASE_URL}/trip/67af347857b476b376e24b01`,
		method: 'get',
	});

	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<Fragment>
			{data && <TripDetails tripName={data.name} tripStops={data.stops} />}
		</Fragment>
	);
}
