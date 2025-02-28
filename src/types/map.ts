import { Feature, LineString } from 'geojson';

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
	geometry: Feature<LineString>['geometry'];
	weight: number;
	distance: number;
	duration: number;
}

export interface MapBoxDirectionsResponse {
	waypoints: MapboxWaypoint[];
	routes: MapboxRoute[];
	code: string;
}
