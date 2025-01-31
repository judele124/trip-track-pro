import {Types} from 'trip-track-package'
export const extractLocations = (data: Types["Trip"]["Model"] | null) => {
    if (!data || !data.stops || !Array.isArray(data.stops)) {
        return [];
    }

    return data.stops.map(stop => ({
        lon: stop.location?.lon ?? null,
        lat: stop.location?.lat ?? null
    })).filter(loc => loc.lon !== null && loc.lat !== null);
}