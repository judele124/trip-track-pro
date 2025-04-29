import { Feature, LineString } from 'geojson';

export interface Maneuver {
	location: [number, number];
	instruction: string;
	modifier: string;
	type: string;
	bearing_before: number;
	bearing_after: number;
}
export interface MapboxWaypoint {
	distance: number;
	location: [number, number];
	name: string;
}

export type DirectionStep = {
	maneuver: Maneuver;
	distance: number;
	duration: number;
	geometry: Feature<LineString>['geometry'];
	name: string;
};

export interface MapboxRoute {
	legs: {
		steps: DirectionStep[];
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
	uuid: string;
}
