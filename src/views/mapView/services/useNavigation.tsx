import { Point } from "../types";
export const getRouteData = async (
    waypoints: Point[],
    accessToken: string,
    setDistance: (distance: number) => void
  ) => {
    if (waypoints.length < 2) return null;
  
    const coordinates = waypoints
      .map((point) => `${point.lngLat.lng},${point.lngLat.lat}`)
      .join(';');
  
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?steps=true&geometries=geojson&access_token=${accessToken}`
    );
  
    const json = await query.json();
    const data = json.routes[0];
    console.log(data);
    
    if(data && data.distance) setDistance(data.distance);
    return data.geometry.coordinates;
  };  