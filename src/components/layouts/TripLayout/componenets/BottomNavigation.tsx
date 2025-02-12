import BottomNavigationBtn from '@/components/ui/BottomNavigationBtn';

export default function BottomNavigation() {
	return (
		<div className='page-colors flex flex-row justify-around border-t-2 border-primary p-2'>
			<BottomNavigationBtn to='participants' notificationCount={3} />
			<BottomNavigationBtn to='map' notificationCount={3} />
			<BottomNavigationBtn notificationCount={3} to='chat' />
		</div>
	);
}
