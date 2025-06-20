import Icon from '@/components/icons/Icon';
import { useMapContext } from '@/contexts/MapContext/MapContext';
import { useTripSocket } from '@/contexts/socketContext/SocketContext';
import { IRedisUserTripData } from '@/contexts/socketContext/types';
import { navigationRoutes } from '@/Routes/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UrgentNotificationListModal = () => {
	const {
		usersLocations,
		urgentNotifications,
		usersInLiveTripExpData,
		resetUnreadUrgentNotificationsCount,
	} = useTripSocket();
	const { mapRef } = useMapContext();
	const nav = useNavigate();

	useEffect(() => {
		resetUnreadUrgentNotificationsCount();
	}, []);

	const handleViewUserOnMap = (userId: string) => {
		const userLocation = usersLocations.find(
			(location) => location.id === userId
		);

		if (userLocation) {
			nav(`${navigationRoutes.map}`);
			mapRef.current?.flyTo({
				zoom: 20,
				center: [userLocation.location.lon, userLocation.location.lat],
			});
		}
	};

	return (
		<div className='page-colors relative z-50 flex h-full w-full flex-col gap-2 overflow-y-auto p-2'>
			{urgentNotifications.map((notification, index) => (
				<UrgentNotificationDetails
					key={`${notification.userId}-${notification.timestamp}-${index}`}
					{...notification}
					handleViewUserOnMap={handleViewUserOnMap}
					usersInLiveTripExpData={usersInLiveTripExpData}
				/>
			))}
		</div>
	);
};

export default UrgentNotificationListModal;

interface UrgentNotificationDetailsProps {
	message: string;
	timestamp: string;
	userId: string;
	handleViewUserOnMap: (userId: string) => void;
	usersInLiveTripExpData: IRedisUserTripData[];
}

function UrgentNotificationDetails({
	message,
	timestamp,
	userId,
	handleViewUserOnMap,
	usersInLiveTripExpData,
}: UrgentNotificationDetailsProps) {
	const user = usersInLiveTripExpData.find((user) => user.userId === userId);
	const name = user?.name;
	const imageSrc = user?.imageUrl;
	return (
		<div
			className={`flex items-center gap-2 rounded-xl border-2 border-red-500 bg-red-100 px-3 py-2 text-dark`}
		>
			<img
				className='size-10 rounded-full border border-dark bg-slate-500 object-cover'
				src={imageSrc}
				alt='user image'
			/>

			<div className='flex flex-col justify-center gap-0.5'>
				<p className='text-sm font-semibold leading-none'>
					{`${name} ${message}`}
				</p>
				<span className='text-xs leading-none text-gray-500'>{timestamp}</span>
			</div>

			<i
				title='View user on map'
				className='ml-auto cursor-pointer'
				onClick={() => handleViewUserOnMap(userId)}
			>
				<Icon name={'location'} />
			</i>
		</div>
	);
}
