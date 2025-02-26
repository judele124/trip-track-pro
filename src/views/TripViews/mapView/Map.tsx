import MapContextProvider from '@/contexts/MapContext';
import useMapInit from './hooks/useMapInit';
import { ReactNode, useEffect, useRef } from 'react';
import { useMapRoute } from './hooks/useMapRoute';
import { Types } from 'trip-track-package';
import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import { navigationRoutes } from '@/Routes/routes';
import { Link } from 'react-router-dom';
import { addRouteToMap } from '@/utils/map.functions';

interface MapProps {
	children?: ReactNode;
	routeOriginalPoints: Types['Trip']['Stop']['Model']['location'][];
}

export default function Map({ children, routeOriginalPoints }: MapProps) {
	const conatinerRef = useRef<HTMLDivElement>(null);
	const { isMapReady, mapRef, error } = useMapInit(conatinerRef);
	const { isRouteReady, routeData } = useMapRoute({
		points: routeOriginalPoints,
	});

	useEffect(() => {
		if (!isMapReady || !routeData || !isRouteReady || !mapRef.current) return;

		addRouteToMap(mapRef.current, routeData);
		mapRef.current.setCenter(
			routeData.routes[0].geometry.coordinates[0] as [number, number]
		);
	}, [isRouteReady, routeData, isMapReady]);

	return (
		<MapContextProvider isMapReady={isMapReady} mapRef={mapRef}>
			{isRouteReady && isMapReady && children}
			{(!isRouteReady || !isMapReady) && (
				<div className='page-colors page-x-padding flex size-full items-center justify-center'>
					{error ? (
						<div className='z-100 absolute left-1/2 top-1/2 flex w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 text-center'>
							<h3>We're sorry, something went wrong while loading the map.</h3>
							<Link to={navigationRoutes.app}>
								<Button primary className='w-full'>
									Back to home
								</Button>
							</Link>
						</div>
					) : (
						<div>
							<Icon size='50' className='fill-primary' name='spinner' />
						</div>
					)}
				</div>
			)}
			<div ref={conatinerRef} className='h-full w-full'></div>
		</MapContextProvider>
	);
}
