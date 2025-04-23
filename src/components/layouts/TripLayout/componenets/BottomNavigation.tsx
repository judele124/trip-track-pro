import BottomNavigationBtn from '@/components/ui/BottomNavigationBtn';

export default function BottomNavigation({
	setRef,
}: {
	setRef?: (ref: HTMLDivElement) => void;
}) {
	return (
		<div
			ref={(node) => {
				if (node) {
					setRef?.(node);
				}
			}}
			className='page-colors flex flex-row justify-around border-t-2 border-primary p-2'
		>
			<BottomNavigationBtn to='participants' notificationCount={3} />
			<BottomNavigationBtn to='map' notificationCount={3} />
			<BottomNavigationBtn notificationCount={3} to='chat' />
		</div>
	);
}
