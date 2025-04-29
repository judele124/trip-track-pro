import { useEffect } from 'react';
import { useMap } from '../../Map';
import {
	addPolygonFillAndOuterFillToMap,
	offsetLocationByMeters,
	Point,
} from '@/utils/map.functions';
import { Maneuver } from '@/types/map';
import * as turf from '@turf/turf';

interface IMapArrowProps {
	outerId: string;
	maneuver: Maneuver;
	fillColor?: string;
	outlineColor?: string;
	outlineWidth?: number;
}

function MapArrow({
	outerId,
	maneuver: { location, bearing_after, bearing_before },
	fillColor = '#32adff',
	outlineColor = 'white',
}: IMapArrowProps) {
	const { mapRef, isMapReady } = useMap();

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;

		const length = 15;
		const width = 3;

		// arrow body points
		const {
			backCenter,
			backLeft,
			backRight,
			centerLeft,
			centerRight,
			frontLeft,
			frontRight,
			frontCenter,
		} = getArrowBasePoints({
			location,
			length,
			width,
			bearing_before,
			bearing_after,
		});

		// arrow head points
		const { arrowHeadBackLeft, arrowHeadBackRight, arrowHeadTop } =
			getArrowHeadPoints({
				baseCenterLocation: frontCenter,
				bearingTop: bearing_after,
				length: width * 1.5,
				width: width * 1.2,
			});

		const pointsInOrder = [
			backCenter,
			backLeft,
			centerLeft,
			frontLeft,
			arrowHeadBackLeft,
			arrowHeadTop,
			arrowHeadBackRight,
			frontRight,
			centerRight,
			backRight,
			backCenter,
		];

		addPolygonFillAndOuterFillToMap({
			outerId,
			map: mapRef.current,
			fillPointsInOrder: pointsInOrder,
			strokePointsInOrder: getArrowOutlineWithTurf(pointsInOrder, 0.7),
			fillOptions: {
				'fill-color': fillColor,
			},
			strokeOptions: {
				'fill-color': outlineColor,
			},
		});
	}, [
		mapRef,
		isMapReady,
		location,
		bearing_after,
		bearing_before,
		fillColor,
		outlineColor,
	]);

	return null;
}

export default MapArrow;

function getArrowBasePoints({
	bearing_after,
	bearing_before,
	length,
	location,
	width,
}: {
	location: Point;
	length: number;
	width: number;
	bearing_before: number;
	bearing_after: number;
}) {
	const backCenter = offsetLocationByMeters(
		location,
		length / 2,
		bearing_before + 180
	);
	const backRight = offsetLocationByMeters(
		backCenter,
		width / 2,
		bearing_before + 90
	);
	const backLeft = offsetLocationByMeters(
		backCenter,
		width / 2,
		bearing_before - 90
	);

	const frontCenter = offsetLocationByMeters(
		location,
		length / 2 / 2,
		bearing_after
	);

	const frontRight = offsetLocationByMeters(
		frontCenter,
		width / 2,
		bearing_after + 90
	);

	const frontLeft = offsetLocationByMeters(
		frontCenter,
		width / 2,
		bearing_after - 90
	);

	const diagonalOffset = (width / 2) * Math.SQRT2;

	const centerRight = offsetLocationByMeters(
		location,
		diagonalOffset,
		bearing_after + 135
	);

	const centerLeft = offsetLocationByMeters(
		location,
		diagonalOffset,
		bearing_after - 45
	);
	return {
		backCenter,
		backRight,
		centerRight,
		frontRight,
		frontLeft,
		centerLeft,
		backLeft,
		frontCenter,
	};
}

function getArrowHeadPoints({
	baseCenterLocation,
	bearingTop,
	length,
	width,
}: {
	baseCenterLocation: Point;
	bearingTop: number;
	length: number;
	width: number;
}) {
	const arrowHeadBackLeft = offsetLocationByMeters(
		baseCenterLocation,
		width,
		bearingTop - 90
	);
	const arrowHeadBackRight = offsetLocationByMeters(
		baseCenterLocation,
		width,
		bearingTop + 90
	);

	const arrowHeadTop = offsetLocationByMeters(
		baseCenterLocation,
		length,
		bearingTop
	);

	return {
		arrowHeadBackLeft,
		arrowHeadBackRight,
		arrowHeadTop,
	};
}

function getArrowOutlineWithTurf(
	pointsInOrder: Point[],
	offset: number
): Point[] {
	// Convert points to the format Turf expects
	const coordinates = pointsInOrder.map((point) => [point[0], point[1]]);
	coordinates.push(coordinates[0]); // To close the polygon
	const polygon = turf.polygon([coordinates]);

	// Apply offset using Turf's buffer function
	const offsetPolygon = turf.buffer(polygon, offset, { units: 'meters' });

	// Ensure the result is valid and not undefined
	if (
		!offsetPolygon ||
		!offsetPolygon.geometry ||
		!offsetPolygon.geometry.coordinates
	) {
		throw new Error('Failed to calculate the offset polygon');
	}

	// Use a different name for the coordinates from the offset polygon
	const offsetCoordinates = offsetPolygon.geometry.coordinates[0];

	// Return the coordinates as an array of Points
	return offsetCoordinates.map(([lon, lat]) => [lon, lat] as [number, number]);
}
