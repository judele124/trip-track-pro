import { Maneuver, MapBoxDirectionsResponse } from '@/types/map';
import {
	addRouteToMap,
	IRouteLayerSpecification,
	removeRouteFromMap,
} from '@/utils/map.functions';
import { addArrowToMap, removeArrowFromMap } from '@/utils/map.functions.arrow';
import useMapInit from '@/views/TripViews/mapView/hooks/useMapInit';
import { Marker } from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import {
	createContext,
	MutableRefObject,
	ReactNode,
	RefObject,
	useContext,
	useEffect,
	useState,
} from 'react';

export interface MapContextValue {
	isMapReady: boolean;
	mapRef: MutableRefObject<Map | null>;
	setMapContainerRef: (ref: HTMLDivElement) => void;
	error: boolean;
	addRouteToRoutesData: (
		id: string,
		route: MapBoxDirectionsResponse,
		options: IRouteLayerSpecification,
		beforeLayerIds?: string
	) => void;
	removeRouteFromRoutesData: (id: string) => void;
	updateRoute: (
		id: string,
		route: MapBoxDirectionsResponse,
		options: IRouteLayerSpecification
	) => void;
	addArrow: (data: MapArrowData) => void;
	removeArrow: () => void;
	updateArrow: (data: MapArrowData) => void;
	addMarker: (data: MapMarkerData) => void;
	removeMarker: (id: string) => void;
	updateMarker: (data: MapMarkerData) => void;
}

export interface MapRouteData {
	id: string;
	route: MapBoxDirectionsResponse;
	options: IRouteLayerSpecification;
	beforeLayerIds?: string;
}

export interface MapArrowData {
	outerId: string;
	maneuver: Maneuver;
	fillColor: string;
	outlineColor: string;
}

export interface MapMarkerData {
	id: string;
	ref: RefObject<HTMLElement | null>;
	isMapReady: boolean;
	mapRef: RefObject<Map | null>;
	location: { lat: number; lon: number };
}

const MapContext = createContext<MapContextValue | null>(null);

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
	const [mapContainerRef, setMapContainerRef] = useState<HTMLDivElement | null>(
		null
	);
	const { isMapReady, mapRef, error } = useMapInit(mapContainerRef);
	const [mapRoutesData, setMapRoutesData] = useState<MapRouteData[]>([]);
	const [mapArrowData, setMapArrowData] = useState<MapArrowData | null>(null);
	const [markersData, setMarkersData] = useState<MapMarkerData[]>([]);

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;
		if (!mapArrowData) return;
		if (!mapRef.current) return;

		const { outerId, maneuver, fillColor, outlineColor } = mapArrowData;
		mapRef.current.on('style.load', () => {
			if (!mapRef.current) return;
			addArrowToMap({
				outerId,
				map: mapRef.current,
				fillColor,
				outlineColor,
				location: maneuver.location,
				bearing_after: maneuver.bearing_after,
				bearing_before: maneuver.bearing_before,
				length: 15,
				width: 3,
			});
		});

		return () => {
			if (!mapRef.current) return;
			removeArrowFromMap(mapRef.current, mapArrowData.outerId);
		};
	}, [mapArrowData, isMapReady]);

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;
		mapRef.current.on('style.load', () => {
			mapRoutesData.forEach(({ id, route, options, beforeLayerIds }) => {
				if (!mapRef.current) return;
				addRouteToMap(id, mapRef.current, route, options, beforeLayerIds);
			});
		});

		return () => {
			mapRoutesData.forEach(({ id }) => {
				if (!mapRef.current) return;
				removeRouteFromMap(mapRef.current, id);
			});
		};
	}, [mapRoutesData, isMapReady]);

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;
		let markers: (Marker | undefined)[] = [];
		console.log(markersData);

		markers = markersData.map(({ ref, location }) => {
			if (!mapRef.current) return;
			if (!mapRef?.current || !isMapReady || !ref?.current) return;
			const marker = new Marker({
				element: ref.current,
			})
				.setLngLat([location.lon, location.lat])
				.addTo(mapRef.current);
			return marker;
		});

		return () => {
			markers.forEach((marker) => {
				if (!mapRef.current) return;
				marker?.remove();
			});
		};
	}, [markersData, isMapReady]);

	const addRouteToRoutesData = (
		id: string,
		route: MapBoxDirectionsResponse,
		options: IRouteLayerSpecification,
		beforeLayerIds?: string
	) => {
		setMapRoutesData((prev) => [
			...prev,
			{ id, route, options, beforeLayerIds },
		]);
	};

	const removeRouteFromRoutesData = (id: string) => {
		setMapRoutesData((prev) => prev.filter((route) => route.id !== id));
	};

	const updateRoute = (
		id: string,
		route: MapBoxDirectionsResponse,
		options: IRouteLayerSpecification
	) => {
		setMapRoutesData((prev) =>
			prev.map((routeData) => {
				if (routeData.id === id) {
					return { ...routeData, route, options };
				}
				return routeData;
			})
		);
	};

	const addArrow = (data: MapArrowData) => {
		setMapArrowData(data);
	};

	const removeArrow = () => {
		setMapArrowData(null);
	};

	const updateArrow = (data: MapArrowData) => {
		setMapArrowData(data);
	};

	const addMarker = (data: MapMarkerData) => {
		setMarkersData((prev) => [...prev, data]);
	};

	const removeMarker = (id: string) => {
		setMarkersData((prev) => prev.filter((marker) => marker.id !== id));
	};

	const updateMarker = (data: MapMarkerData) => {
		setMarkersData((prev) =>
			prev.map((marker) => {
				if (marker.id === data.id) {
					return data;
				}
				return marker;
			})
		);
	};

	return (
		<MapContext.Provider
			value={{
				isMapReady,
				mapRef,
				setMapContainerRef,
				error,
				addRouteToRoutesData,
				removeRouteFromRoutesData,
				updateRoute,
				addArrow,
				removeArrow,
				updateArrow,
				addMarker,
				removeMarker,
				updateMarker,
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
