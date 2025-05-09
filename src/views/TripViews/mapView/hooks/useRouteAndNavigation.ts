import { MapBoxDirectionsResponse } from '@/types/map';
import { useMapboxDirectionRoute } from './useMapboxDirectionRoute';
import useNextStepIndex from './useNextStepIndex';
import { useRouteProgress } from './useRouteProgress';
import { Point } from '@/utils/map.functions';
import useFakeUserLocation from '../tests/useFakeUserLocation';
import useCurrentUserOutOfTripRoute from './useCurrentUserOutOfTripRoute';
import { Map, Marker } from 'mapbox-gl';
import { useEffect } from 'react';
import { useMap } from '../Map';

interface IUseRouteAndNavigationProps {
	userLocation: { lon: number; lat: number } | null;
	points: { lon: number; lat: number }[];
}

interface IUseRouteAndNavigationReturn {
	routeData: MapBoxDirectionsResponse | null | undefined;
	walkedPath: Point[];
	nextStepIndex: number;
	userToStepNextDistance: number;
	isOutOfRoute: boolean;
	fakeUserLocation: { lon: number; lat: number } | null;
}

export default function useRouteAndNavigation({
	points,
	userLocation,
}: IUseRouteAndNavigationProps): IUseRouteAndNavigationReturn {
	const { routeData } = useMapboxDirectionRoute({
		points,
	});

	const fakeUserLocation = useFakeUserLocation({
		points:
			routeData?.routes[0].geometry.coordinates.map((p) => ({
				lon: p[0],
				lat: p[1],
			})) || [],
	});

	const { nextStepIndex, userToStepNextDistance } = useNextStepIndex({
		userLocation: fakeUserLocation,
		steps: routeData?.routes[0].legs[0].steps,
	});

	const { walkedPath } = useRouteProgress({
		userLocation: fakeUserLocation
			? [fakeUserLocation.lon, fakeUserLocation.lat]
			: null,
		routeCoordinates: routeData?.routes[0].geometry.coordinates || [],
	});

	const { isOutOfRoute } = useCurrentUserOutOfTripRoute({
		geometryPoints: routeData?.routes[0].geometry.coordinates || [],
		userLocation: fakeUserLocation,
	});

	const { isMapReady, mapRef } = useMap();

	useEffect(() => {
		if (!mapRef.current || !isMapReady || !routeData) return;
		routeData.routes[0].geometry.coordinates.forEach((p) => {
			createMarker(mapRef.current!, [p[0], p[1]]);
		});
	}, [mapRef, routeData, isMapReady]);

	return {
		routeData,
		walkedPath,
		nextStepIndex,
		userToStepNextDistance: userToStepNextDistance.current,
		isOutOfRoute,
		fakeUserLocation,
	};
}

const createMarker = (map: Map, location: Point) => {
	const div = document.createElement('div');
	div.className = 'size-2 rounded-full bg-red-500';
	new Marker({
		element: div,
	})
		.setLngLat([location[0], location[1]])
		.addTo(map);
};
