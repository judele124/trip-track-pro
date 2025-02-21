import { Map } from 'mapbox-gl';
import {
	createContext,
	useContext,
	ReactNode,
	FC,
	MutableRefObject,
} from 'react';

export interface MapContextValue {
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
}

const MapContext = createContext<MapContextValue | null>(null);

interface MapContextProviderProps {
	children: ReactNode;
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
}

const MapContextProvider: FC<MapContextProviderProps> = ({
	children,
	isMapReady,
	mapRef,
}: MapContextProviderProps) => {
	return (
		<MapContext.Provider value={{ isMapReady, mapRef }}>
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

export default MapContextProvider;
