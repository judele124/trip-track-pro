import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from './componenets/TopNavigationBar';
import BottomNavigation from './componenets/BottomNavigation';
import { useTripContext } from '@/contexts/TripContext';
import { navigationRoutes } from '@/Routes/routes';
import Button from '@/components/ui/Button';

const TripLayout = () => {
	let { pathname } = useLocation();
	const title = titleFromPath(pathname);
	const { trip, tripId, loadingTrip } = useTripContext();
	const nav = useNavigate();

	return (
		<div className='page-colors relative z-0 mx-auto flex h-dvh max-w-[450px] flex-col'>
			{/* top navigation */}
			<TopNavigation title={title} />

			{/* main content */}
			<div className='-z-10 grow overflow-hidden bg-secondary/20'>
				{!loadingTrip && (!tripId || !trip) ? (
					<div className='page-padding text-center'>
						<p>
							{!tripId
								? '⚠️ Oops! No trip was found.'
								: '🚨 Error: The trip could not be loaded.'}
						</p>
						<Button
							className='mt-5 w-full'
							onClick={() => nav(navigationRoutes.app)}
							primary
						>
							Go Home
						</Button>
					</div>
				) : (
					<Outlet />
				)}
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
