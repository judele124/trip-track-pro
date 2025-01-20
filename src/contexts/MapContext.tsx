import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Map as MapboxMap } from 'mapbox-gl';
interface MapContextValue {
  isMapReady: boolean;
  mapRef: MapboxMap | null;
  setMapReady: (ready: boolean) => void;
  setMapRef: (map: MapboxMap | null) => void;
  mapBoxAccessToken?: string;
}

const MapContext = createContext<MapContextValue | null>(null);

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider: React.FC<MapContextProviderProps> = ({ children }) => {
  const [isMapReady, setMapReady] = useState(false);
  const [mapRef, setMapRef] = useState<MapboxMap | null>(null);

  return (
    <MapContext.Provider value={{ isMapReady, mapRef, setMapReady, setMapRef }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
   const context = useContext(MapContext);
    if (!context) {
      throw new Error("useMapContext must be used within a MapContextProvider");
    }
    return context;
}

export default MapContextProvider;
