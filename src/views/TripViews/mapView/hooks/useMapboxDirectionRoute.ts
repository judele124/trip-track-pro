import useAxios from '@/hooks/useAxios';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapBoxDirectionsResponse } from '@/types/map';

interface IUseMapRoute {
	points: { lon: number; lat: number }[];
	runGetDirectionsRoute: boolean;
}

interface IUseMapRouteReturn {
	routeData: MapBoxDirectionsResponse | null;
}

export const useMapboxDirectionRoute = ({
	points,
	runGetDirectionsRoute,
}: IUseMapRoute): IUseMapRouteReturn => {
	const { data, activate } = useAxios({
		method: 'GET',
		manual: true,
	});

	useEffect(() => {
		if (!points.length || !runGetDirectionsRoute) return;

		const getDirectionsRoute = (points: IUseMapRoute['points']) => {
			const coords = points.map((p) => `${p.lon},${p.lat}`).join(';');
			activate({
				url: `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}&steps=true&overview=full`,
				method: 'GET',
				withCredentials: false,
			});
		};

		getDirectionsRoute(points);
	}, [points, runGetDirectionsRoute]);

	return {
		routeData: data,
	};
};
