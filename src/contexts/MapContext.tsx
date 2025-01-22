import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Map as MapboxMap } from "mapbox-gl";
import { IconName } from "@/components/icons/Icon";

interface IexperiencePoints {
  location: [number, number];
  Experience: IconName;
}

interface ItravelsPoints {
  location: [number, number];
  rule: string;
}

interface MapContextValue {
  isMapReady: boolean;
  setMapReady: (ready: boolean) => void;
  mapRefContext: MapboxMap | null;
  setMapRefContext: (map: MapboxMap | null) => void;
  experiencePoints: IexperiencePoints[];
  setExperiencePoints: (points: IexperiencePoints[]) => void;
  travelsPoints: ItravelsPoints[];
  setTravelsPoints: (points: ItravelsPoints[]) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

interface MapContextProviderProps {
  children: ReactNode;
}

const expP:IexperiencePoints[] = [
  { location: [-74.006, 40.7128], Experience: "menu" },
  { location: [-73.935242, 40.73061], Experience: "flag" },
  { location: [-73.984016, 40.7484], Experience: "circle" },
  { location: [-73.9665, 40.7812], Experience: "trivia" },
];

const travelsP:ItravelsPoints[] = [
  { location: [-74.011, 40.7079] , rule: "user" },
  { location: [-73.943, 40.7292] , rule: "user" },
  { location: [-73.979, 40.7641] , rule: "guide" },
]

const MapContextProvider: React.FC<MapContextProviderProps> = ({
  children,
}) => {
  const [isMapReady, setMapReady] = useState<boolean>(false);
  const [mapRefContext, setMapRefContext] = useState<MapboxMap | null>(null);
  const [experiencePoints, setExperiencePoints] = useState<IexperiencePoints[]>([]);
  const [travelsPoints, setTravelsPoints] = useState<ItravelsPoints[]>([]);

  useEffect(() => {
    setExperiencePoints(expP);
    setTravelsPoints(travelsP);
  }, []);

  return (
    <MapContext.Provider
      value={{
        isMapReady,
        setMapReady,
        mapRefContext,
        setMapRefContext,
        experiencePoints,
        setExperiencePoints,
        travelsPoints,
        setTravelsPoints,
      }}
    >
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
};

export default MapContextProvider;
