import { useEffect } from 'react';
import { useMap } from '../../Map';
import {
	addPolygonFillAndLineToMap,
	offsetLocationByMeters,
	Point,
} from '@/utils/map.functions';
import { Maneuver } from '@/types/map';

interface IMapArrowProps {
	fillLayerId: string;
	lineLayerId: string;
	maneuver: Maneuver;
	fillColor?: string;
	outlineColor?: string;
	outlineWidth?: number;
}

function MapArrow({
	fillLayerId,
	lineLayerId,
	maneuver: { location, bearing_after, bearing_before },
	fillColor = '#32adff',
	outlineColor = 'white',
	outlineWidth = 3,
}: IMapArrowProps) {
	const { mapRef, isMapReady } = useMap();

	useEffect(() => {
		if (!mapRef.current || !isMapReady) return;

		const length = 15;
		const width = 5;

		// arrow body
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

		// arrow head
		const { arrowHeadBackLeft, arrowHeadBackRight, arrowHeadTop } =
			getArrowHeadPoints({
				baseCenterLocation: frontCenter,
				bearingTop: bearing_after,
				length: width * 1.2,
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

		addPolygonFillAndLineToMap({
			fillLayerId,
			lineLayerId,
			map: mapRef.current,
			pointsInOrder,
			fillOptions: {
				'fill-color': fillColor,
			},
			lineOptions: {
				'line-color': outlineColor,
				'line-width': outlineWidth,
			},
		});
		console.log('drawing');

		mapRef.current.setCenter(location);
		mapRef.current.setZoom(20);
	}, [
		mapRef,
		isMapReady,
		location,
		bearing_after,
		bearing_before,
		fillColor,
		outlineColor,
		outlineWidth,
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
