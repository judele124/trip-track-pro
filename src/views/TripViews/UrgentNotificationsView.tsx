import Icon from '@/components/icons/Icon';
import { useMapContext } from '@/contexts/MapContext/MapContext';
import { useTripSocket } from '@/contexts/socketContext/SocketContext';
import { navigationRoutes } from '@/Routes/routes';
import { useNavigate } from 'react-router-dom';

const UrgentNotificationListModal = () => {
	const { usersLocations, urgentNotifications, usersInLiveTripExpData } =
		useTripSocket();
	const { mapRef } = useMapContext();
	const nav = useNavigate();

	const handleViewUserOnMap = (userId: string) => {
		console.log(userId);

		const userLocation = usersLocations.find(
			(location) => location.id === userId
		);
		console.log(userLocation);

		if (userLocation) {
			nav(`${navigationRoutes.map}`);
			mapRef.current?.flyTo({
				zoom: 20,
				center: [userLocation.location.lon, userLocation.location.lat],
			});
		}
	};

	return (
		<div className='page-colors relative z-50 flex h-full w-full flex-col gap-2 overflow-y-auto rounded-md p-2'>
			{urgentNotifications.map(
				({ message, timestamp, status, userId }, index) => (
					<div
						key={`urgent-notification-${userId}-${timestamp}-${index}`}
						className={`flex flex-row items-center justify-between rounded-xl border-2 border-red-500 bg-red-100 px-2 py-1 text-dark`}
					>
						<img
							className='size-10 rounded-full border border-dark bg-slate-500 object-cover'
							src={
								usersInLiveTripExpData.find((user) => user.userId === userId)
									?.imageUrl
							}
							alt=''
						/>

						<div className='flex flex-col justify-between'>
							<span className='text-lg font-semibold'>
								{`${usersInLiveTripExpData.find((user) => user.userId === userId)?.name} ` +
									message}
							</span>
							<p className='text-sm'>{timestamp}</p>
						</div>

						<i onClick={() => handleViewUserOnMap(userId)}>
							<Icon name={'location'} />
						</i>
					</div>
				)
			)}
		</div>
	);
};

export default UrgentNotificationListModal;
