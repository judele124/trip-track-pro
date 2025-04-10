import { MapBoxDirectionsResponse } from '@/types/map';
import { Map } from 'mapbox-gl';
import {
	createContext,
	useContext,
	ReactNode,
	FC,
	MutableRefObject,
	Dispatch,
	SetStateAction,
} from 'react';

export interface MapContextValue {
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
	routes: MapBoxDirectionsResponse[];
	addRoute: (route: MapBoxDirectionsResponse) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

interface MapContextProviderProps {
	children: ReactNode;
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
	routes: MapBoxDirectionsResponse[];
	setRoutes: Dispatch<SetStateAction<MapBoxDirectionsResponse[]>>;
}

const MapContextProvider: FC<MapContextProviderProps> = ({
	children,
	isMapReady,
	mapRef,
	routes,
	setRoutes,
}: MapContextProviderProps) => {
	const addRoute = (route: MapBoxDirectionsResponse) => {
		setRoutes((prevRoutes) => [...prevRoutes, route]);
	};

	return (
		<MapContext.Provider value={{ isMapReady, mapRef, routes, addRoute }}>
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
