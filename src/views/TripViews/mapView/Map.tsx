import useMapInit from './hooks/useMapInit';
import { ReactNode, useRef } from 'react';
import { useMapRoute } from './hooks/useMapRoute';
import { Types } from 'trip-track-package';
import Icon from '@/components/icons/Icon';

interface MapProps {
	children?: ReactNode;
	routeOriginalPoints: Types['Trip']['Stop']['Model']['location'][];
}

export default function Map({ children, routeOriginalPoints }: MapProps) {
	const conatinerRef = useRef<HTMLDivElement>(null);
	const { isMapReady, mapRef } = useMapInit(conatinerRef);
	const { isRouteReady } = useMapRoute({
		points: routeOriginalPoints,
		mapRef,
		isMapReady,
	});

	return (
		<>
			{!isRouteReady ? (
				<div className='page-colors flex size-full items-center justify-center'>
					<div>
						<Icon size='50' className='fill-primary' name='spinner' />
					</div>
				</div>
			) : (
				<>{children}</>
			)}
			<div ref={conatinerRef} className='h-full w-full'></div>
		</>
	);
}
