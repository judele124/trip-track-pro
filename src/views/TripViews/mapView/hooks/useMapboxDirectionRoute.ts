import useAxios from '@/hooks/useAxios';
import { useEffect } from 'react';
import { MapBoxDirectionsResponse } from '@/types/map';
import { API_BASE_URL } from '@/env.config';

interface IUseMapRoute {
	points: { lon: number; lat: number }[];
}

interface IUseMapRouteReturn {
	routeData: MapBoxDirectionsResponse | null | undefined;
}

export const useMapboxDirectionRoute = ({
	points,
}: IUseMapRoute): IUseMapRouteReturn => {
	const { data, activate } = useAxios<MapBoxDirectionsResponse>({
		method: 'GET',
		manual: true,
	});

	useEffect(() => {
		if (!points.length) return;

		const getDirectionsRoute = (points: IUseMapRoute['points']) => {
			const coords = points.map((p) => `${p.lon},${p.lat}`).join(';');
			activate({
				url: `${API_BASE_URL}/map/route?points=${coords}&language=${navigator.language}`,
				method: 'GET',
			});
		};

		getDirectionsRoute(points);
	}, [points]);

	return {
		routeData: data,
	};
};
