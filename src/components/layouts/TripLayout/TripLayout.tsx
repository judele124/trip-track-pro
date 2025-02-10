import { Outlet, useLocation } from 'react-router-dom';
import TopNavigation from './componenets/TopNavigationBar';
import BottomNavigation from './componenets/BottomNavigation';

const TripLayout = () => {
	let { pathname } = useLocation();
	const title = titleFromPath(pathname);

	return (
		<div className='page-colors relative z-0 mx-auto flex h-dvh max-w-[450px] flex-col'>
			{/* top navigation */}
			<TopNavigation title={title} />

			{/* main content */}
			<div className='-z-10 grow overflow-hidden bg-secondary/20'>
				<Outlet />
			</div>

			{/* bottom navigation */}
			<BottomNavigation />
		</div>
	);
};

export default TripLayout;

const titleFromPath = (path: string) => {
	const arr = path.split('/');
	path = arr[arr.length - 1];
	return path.charAt(0).toUpperCase() + path.slice(1);
};
