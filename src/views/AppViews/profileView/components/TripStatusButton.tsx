import { statusArray } from 'trip-track-package/dist/trip.schema';

interface TripStatusButtonProps {
	status: (typeof statusArray)[number];
}

export default function TripStatusButton({ status }: TripStatusButtonProps) {
	return <div className='px-3 py-2'>{status}</div>;
}

const getColors = (status: (typeof statusArray)[number]) => {
	switch (status) {
		case 'created':
			return ['bg-red-500', 'text-white'];
		case 'started':
			return ['bg-gray-500', 'text-white'];
		case 'completed':
			return ['bg-gray-500', 'text-white'];
		case 'cancelled':
			return ['bg-green-500', 'text-white'];
		default:
			return ['bg-gray-500', 'text-white'];
	}
};
