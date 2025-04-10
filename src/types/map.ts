import { Feature, LineString } from 'geojson';

interface MapboxWaypoint {
	location: [number, number];
	name: string;
}

type DirectionStep = {
	maneuver: {
		location: [number, number];
		instruction: string;
		modifier: string;
		type: string;
	};
	distance: number;
	duration: number;
	geometry: Feature<LineString>['geometry'];
	name: string;
};

interface MapboxRoute {
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
