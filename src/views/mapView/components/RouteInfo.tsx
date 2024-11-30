import { Point } from "../types";
const RouteInfo = ({ points, distance }: { points: Point[]; distance: number | null }) => (
    <div className="">
      <div className="text-sm font-medium text-gray-700">
        Points: {points.length}/4
      </div>
      {distance && (
        <div className="text-sm font-medium text-gray-700">
          Total Distance: {(distance / 1000).toFixed(2)} km
        </div>
      )}
    </div>
  );

export default RouteInfo;