import { Trip } from '@/types/trip';
import { useMapContext } from '@/contexts/MapContext/MapContext';
import useDrawRangeAroundStop from '../../hooks/useDrawRangeAroundStop';
import GeneralMarker from './GeneralMarker';
import StopMarker from './StopMarker';

export default function TripStopsMarkers({
	stops,
	currentExpIndex,
	isExperienceActive,
}: {
	stops: Trip['stops'];
	currentExpIndex: number;
	isExperienceActive?: boolean;
}) {
	const { mapRef, isMapReady } = useMapContext();

	useDrawRangeAroundStop({
		isMapReady,
		mapRef,
		location: [
			stops[currentExpIndex].location.lon,
			stops[currentExpIndex].location.lat,
		],
		circleRadius: 40,
	});

	const experienceStops = stops.filter((stop) => stop.experience);
	const nurmalStops = stops.filter((stop) => !stop.experience);

	return (
		<>
			{experienceStops.map((stop, i) => (
				<GeneralMarker
					key={`exp-${stop.location.lat}-${stop.location.lon}-${i}`}
					location={stop.location}
					id={`exp-${stop.location.lat}-${stop.location.lon}-${i}`}
				>
					<StopMarker
						disableExperience={currentExpIndex !== i}
						isExperienceActive={isExperienceActive}
						stop={stop}
						index={i}
					/>
				</GeneralMarker>
			))}
			{nurmalStops.map((stop, i) => (
				<GeneralMarker
					key={`norm-${stop.location.lat}-${stop.location.lon}-${i}`}
					location={stop.location}
					id={`norm-${stop.location.lat}-${stop.location.lon}-${i}`}
				>
					<StopMarker
						disableExperience={false}
						isExperienceActive={false}
						stop={stop}
						index={i}
					/>
				</GeneralMarker>
			))}
		</>
	);
}
