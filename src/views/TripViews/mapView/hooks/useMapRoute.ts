import useAxios from "@/hooks/useAxios";
import { Map } from "mapbox-gl";
import { MutableRefObject, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Feature, LineString } from "geojson";

interface MapboxWaypoint {
  location: [number, number];
  name: string;
}

interface MapboxRoute {
  legs: {
    steps: [];
    weight: number;
    distance: number;
    summary: string;
    duration: number;
  }[];
  geometry: Feature<LineString>["geometry"];
  weight: number;
  distance: number;
  duration: number;
}

interface MapBoxDirectionsResponse {
  waypoints: MapboxWaypoint[];
  routes: MapboxRoute[];
  code: string;
}

interface IUseMapRoute {
  points: { lon: number; lat: number }[];
  mapRef: MutableRefObject<Map | null>;
  isMapReady: boolean;
}

interface IUseMapRouteReturn {
  isRouteReady: boolean;
}

export const useMapRoute = ({
  points,
  mapRef,
  isMapReady,
}: IUseMapRoute): IUseMapRouteReturn => {
  const [isRouteReady, setIsRouteReady] = useState(false);
  const { data, activate } = useAxios({
    method: "GET",
    manual: true,
  });

  useEffect(() => {
    if (!isMapReady || !points.length) return;

    const coords = points.map((p) => `${p.lon},${p.lat}`).join(";");
    activate({
      url: `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}&steps=true&overview=full`,
      method: "GET",
      withCredentials: false,
    });
  }, [isMapReady]);

  useEffect(() => {
    if (!data || !mapRef.current) return;
    const routeData = data as MapBoxDirectionsResponse;

    try {
      if (mapRef.current.getSource("route")) {
        try {
          mapRef.current.removeLayer("route");
          mapRef.current.removeSource("route");
        } catch (error) {
          console.error("Error removing existing route:", error);
        }
      }

      mapRef.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: routeData.routes[0].geometry,
        },
      });

      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });

      mapRef.current.setCenter(
        routeData.routes[0].geometry.coordinates[0] as [number, number],
      );
      mapRef.current.setZoom(15);
      setIsRouteReady(true);
    } catch (error) {
      console.error("Error creating route:", error);
    }
  }, [data]);

  return {
    isRouteReady,
  };
};
