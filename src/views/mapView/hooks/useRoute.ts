import { useMapContext, MapContextValue } from "@/contexts/MapContext";
import mapboxgl from "mapbox-gl";
import useAxios from "@/hooks/useAxios";
import { useEffect } from "react";

export const useRoute = ({
  points,
  mapRef: mapRefCurrent,
}: {
  mapRef: MapContextValue["mapRef"];
  points: [number, number][];
}) => {
  const { data, loading, status, error, activate } = useAxios({
    url: ``,
    method: "GET",
    manual: true,
  });

  useEffect(() => {
    if (!points.length || status) return;
    const coords = points.join(";");
    console.log(points);

    // activate({
    //   url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`,
    //   method: "GET",
    // });
  }, [points]);

  useEffect(() => {
    console.log(data);
    // if (!mapRefCurrent || !mapRefCurrent.loaded()) {
    //     console.log("Map not initialized yet");
    //     return;
    // }
    // const createRoute = async (points: [number, number][]) => {
    //   try {
    //     if (mapRefCurrent.getSource("route")) {
    //       try {
    //         mapRefCurrent.removeLayer("route");
    //         mapRefCurrent.removeSource("route");
    //       } catch (error) {
    //         console.error("Error removing existing route:", error);
    //       }
    //     }

    //     mapRefCurrent.addSource("route", {
    //       type: "geojson",
    //       data: {
    //         type: "Feature",
    //         properties: {},
    //         geometry: json.routes[0].geometry,
    //       },
    //     });

    //     mapRefCurrent.addLayer({
    //       id: "route",
    //       type: "line",
    //       source: "route",
    //       layout: {
    //         "line-join": "round",
    //         "line-cap": "round",
    //       },
    //       paint: {
    //         "line-color": "#3887be",
    //         "line-width": 5,
    //         "line-opacity": 0.75,
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Error creating route:", error);
    //   }
    // };
  }, [data]);
};
