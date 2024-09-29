import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

const token =
  "pk.eyJ1IjoibGFwaWR5b24iLCJhIjoiY20wbXRwcXdxMDV5azJtc2RybXFoM2ZqdCJ9.b0EL6s4iXwlIJWkme4bXcw";

interface IUersCoords {
  lat: number;
  lng: number;
}
const TestMapbox = () => {
  const [[lng, lat], setInputCoords] = useState<[number, number]>([0, 0]);
  const [usersCoords, setUsersCoords] = useState<IUersCoords[]>([]);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setInputCoords([lng, lat]);
        mapboxgl.accessToken = token;
        mapRef.current = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center: [lng, lat], // starting position [lng, lat]
          zoom: 12, // starting zoom
        });

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  useEffect(() => {
    if (mapRef.current !== null) {
      usersCoords.forEach(({ lat, lng }) => {
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current!);
      });
    }
  }, [usersCoords]);

  const handleEnter = () => {
    setUsersCoords((prev) => [...prev, { lat, lng }]);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="h-full w-full overflow-hidden" id="map"></div>
      <div className="absolute bottom-0 flex w-full flex-col bg-light p-5">
        <label>Enter location</label>
        <input
          onChange={(e) =>
            setInputCoords((prev) => [prev[0], Number(e.target.value)])
          }
          value={lat}
          className="border-2"
          type="text"
          placeholder="Enter latitude"
        />
        <input
          value={lng}
          onChange={(e) =>
            setInputCoords((prev) => [Number(e.target.value), prev[1]])
          }
          className="border-2"
          type="text"
          placeholder="Enter longitude"
        />
        <button onClick={handleEnter}>Enter</button>
      </div>
    </div>
  );
};

export default TestMapbox;
