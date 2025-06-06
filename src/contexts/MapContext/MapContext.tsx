import useMapInit from '@/views/TripViews/mapView/hooks/useMapInit';
import { Map } from 'mapbox-gl';
import {
	createContext,
	MutableRefObject,
	ReactNode,
	RefObject,
	useContext,
	useRef,
	useState,
} from 'react';

export interface MapContextValue {
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
	setMapContainerRef: (ref: HTMLDivElement) => void;
	error: boolean;
}

const MapContext = createContext<MapContextValue | null>(null);

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
	const [mapContainerRef, setMapContainerRef] = useState<HTMLDivElement | null>(
		null
	);
	const { isMapReady, mapRef, error } = useMapInit(mapContainerRef);

	return (
		<MapContext.Provider
			value={{
				isMapReady,
				mapRef,
				setMapContainerRef,
				error,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

export const useMapContext = () => {
	const context = useContext(MapContext);
	if (!context) {
		throw new Error('useMapContext must be used within a MapContextProvider');
	}
	return context;
};
