import { Map } from 'mapbox-gl';
import {
	createContext,
	useContext,
	ReactNode,
	FC,
	MutableRefObject,
	useState,
	useRef,
} from 'react';

interface MapContextProviderProps {
	children: ReactNode;
}

const MapContext = createContext<{
	isMapReady: boolean;
	setMapReady: React.Dispatch<React.SetStateAction<boolean>>;
	mapRef: MutableRefObject<Map | null>;
} | null>(null);

const MapContextProvider: FC<MapContextProviderProps> = ({
	children,
}: MapContextProviderProps) => {
	const [isMapReady, setMapReady] = useState<boolean>(false);
	const mapRef = useRef<Map | null>(null);
	return (
		<MapContext.Provider value={{ isMapReady, setMapReady, mapRef }}>
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
