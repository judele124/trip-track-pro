import { useEffect } from 'react';
import { Point } from '../types';

interface IMapPointsProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  points: Point[];
  setPoints: (points: Point[]) => void;
  setDistance: (distance: number | null) => void;
}

export const clearPoints = (props: IMapPointsProps) => {
    const { map , points, setPoints, setDistance } = props;
    console.log(points);
    
    if (map.current?.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }
    points.forEach((point) => point.marker.remove());
    setPoints([]);
    setDistance(null);
};