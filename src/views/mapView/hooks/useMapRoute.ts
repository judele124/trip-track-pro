import useAxios from "@/hooks/useAxios";
import { Map } from "mapbox-gl";
import { MutableRefObject, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Feature } from "geojson";

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
  geometry: Feature["geometry"];
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

export const useMapRoute = ({ points, mapRef, isMapReady }: IUseMapRoute) => {
  const { data, loading, status, error, activate } = useAxios({
    method: "GET",
    manual: true,
  });

  useEffect(() => {
    if (!isMapReady || !points.length) return;

    const coords = points.map((p) => `${p.lon},${p.lat}`).join(";");
    activate({
      url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`,
      method: "GET",
      withCredentials: false,
    });
  }, [isMapReady]);

  useEffect(() => {
    if (!data || !mapRef.current) return;
    const routeData = data as MapBoxDirectionsResponse;
    console.log(routeData);

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

      mapRef.current.setCenter(data.routes[0].center);
    } catch (error) {
      console.error("Error creating route:", error);
    }
  }, [data]);
};
