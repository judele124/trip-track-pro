import BottomNavigationBtn from '@/components/ui/BottomNavigationBtn';
import { useTripSocket } from '@/contexts/SocketContext';

export default function BottomNavigation({
	setRef,
}: {
	setRef?: (ref: HTMLDivElement) => void;
}) {
	const { usersInLiveTripData, unreadMsg, setUnreadMsg } = useTripSocket();

	return (
		<div
			ref={(node) => {
				if (node) {
					setRef?.(node);
				}
			}}
			className='page-colors flex flex-row justify-around border-t-2 border-primary p-2'
		>
			<BottomNavigationBtn
				to='participants'
				notificationCount={usersInLiveTripData?.length}
				hndleClick={() => setUnreadMsg({ count: 0, isInChat: false })}
			/>
			<BottomNavigationBtn
				to='map'
				hndleClick={() => setUnreadMsg({ count: 0, isInChat: false })}
			/>
			<BottomNavigationBtn
				notificationCount={unreadMsg.count}
				to='chat'
				hndleClick={() => setUnreadMsg({ count: 0, isInChat: true })}
			/>
		</div>
	);
}
