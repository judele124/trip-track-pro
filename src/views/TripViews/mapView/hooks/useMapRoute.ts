import useAxios from '@/hooks/useAxios';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapBoxDirectionsResponse } from '@/types/map';

interface IUseMapRoute {
	points: { lon: number; lat: number }[];
}

interface IUseMapRouteReturn {
	isRouteReady: boolean;
	routeData: MapBoxDirectionsResponse | null;
}

export const useMapRoute = ({ points }: IUseMapRoute): IUseMapRouteReturn => {
	const { data, activate, loading } = useAxios({
		method: 'GET',
		manual: true,
	});

	useEffect(() => {
		if (!points.length) return;

		const coords = points.map((p) => `${p.lon},${p.lat}`).join(';');
		activate({
			url: `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}&steps=true&overview=full`,
			method: 'GET',
			withCredentials: false,
		});
	}, [points]);

	return {
		isRouteReady: data && !loading,
		routeData: data,
	};
};
