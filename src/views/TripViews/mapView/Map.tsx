import MapContextProvider from '@/contexts/MapContext';
import useMapInit from './hooks/useMapInit';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import { navigationRoutes } from '@/Routes/routes';
import { Link } from 'react-router-dom';
import { addRouteToMap } from '@/utils/map.functions';
import { MapBoxDirectionsResponse } from '@/types/map';
import Modal from '@/components/ui/Modal';

interface MapProps {
	children?: ReactNode;
	mapboxDirectionRoute: MapBoxDirectionsResponse | null;
}

export default function Map({ children, mapboxDirectionRoute }: MapProps) {
	const conatinerRef = useRef<HTMLDivElement>(null);
	const { isMapReady, mapRef, error } = useMapInit(conatinerRef);
	const [routeError, setRouteError] = useState<Error | null>(null);
	useEffect(() => {
		if (!isMapReady || !mapboxDirectionRoute || !mapRef.current) return;
		if (mapboxDirectionRoute.code === 'NoRoute') {
			setRouteError(new Error('No route found'));
			return;
		}

		addRouteToMap(mapRef.current, mapboxDirectionRoute);

		mapRef.current.setCenter(
			mapboxDirectionRoute.routes[0].geometry.coordinates[0] as [number, number]
		);
	}, [isMapReady, mapboxDirectionRoute]);

	return (
		<>
			{routeError && (
				<Modal
					open={routeError !== null}
					center
					onBackdropClick={() => setRouteError(null)}
				>
					<div className='page-colors max-w-[400px] rounded-2xl p-5 text-center'>
						<h2>We're sorry no route found</h2>
					</div>
				</Modal>
			)}
			<MapContextProvider isMapReady={isMapReady} mapRef={mapRef}>
				{isMapReady && children}

				{!isMapReady && (
					<div className='page-colors page-x-padding flex size-full items-center justify-center'>
						{error ? (
							<div className='z-100 absolute left-1/2 top-1/2 flex w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 text-center'>
								<h3>
									We're sorry, something went wrong while loading the map.
								</h3>
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
		</>
	);
}
