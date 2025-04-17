import { isOutOfRouteBetweenSteps } from '@/utils/map.functions';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface IUseCurrentUserOutOfTripRouteProps {
	geometryPoints: number[][];
	userLocation: { lon: number; lat: number } | null;
}
interface IUseCurrentUserOutOfTripRouteReturn {
	isOutOfRoute: boolean;
	nextGeometryPoint: MutableRefObject<number>;
}

export default function useCurrentUserOutOfTripRoute({
	geometryPoints,
	userLocation,
}: IUseCurrentUserOutOfTripRouteProps): IUseCurrentUserOutOfTripRouteReturn {
	const [isOutOfRoute, setIsOutOfRoute] = useState(false);
	const nextGeometryPoint = useRef<number>(0);

	useEffect(() => {
		if (!userLocation) return;
		const { lon, lat } = userLocation;
		const isOut = isOutOfRouteBetweenSteps({
			userLocation: [lon, lat],
			routePoints: geometryPoints,
			lastStepIndex: nextGeometryPoint.current,
			threshold: 20,
		});

		nextGeometryPoint.current = isOut.nextPointIndex;

		setIsOutOfRoute(isOut.isOut);
	}, [userLocation]);
	return { isOutOfRoute, nextGeometryPoint };
}
