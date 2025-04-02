import { useAuthContext } from '@/contexts/AuthContext';
import ImageLightDark from '@/components/ui/ImageLightDark';
import imgSrcLight from '@/views/AppViews/homePageView/assets/start-screen-light.svg';
import imgSrcDark from '@/views/AppViews/homePageView/assets/start-screen-dark.svg';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '@/Routes/routes';
import { getErrorMessage } from '@/utils/errorMessages';

const LogoutView = () => {
	const { logout, logoutError, user, logoutStatus } = useAuthContext();
	const nav = useNavigate();

	return (
		<div className='relative mt-10 flex grow flex-col'>
			<ImageLightDark
				className='absolute inset-0 top-1/2 mx-auto -translate-y-1/2 blur-sm'
				srcDark={imgSrcDark}
				srcLight={imgSrcLight}
				alt='rocket'
			/>
			<div className='page-colors page-padding absolute top-1/2 m-4 flex -translate-y-1/2 flex-col gap-3 rounded-2xl border-4 border-dark text-white dark:border-primary'>
				<h1 className='text-2xl'>Goodbye {user?.name}!</h1>
				<p className='text-pretty'>
					Thank you for joining us on this journey! We hope you had a great time
					exploring with us.
				</p>
				<p>You will need to sign in again to access your account.</p>
				<Button
					onClick={async () => {
						await logout();
						nav(navigationRoutes.app);
					}}
				>
					Log out
				</Button>
				{logoutError && logoutStatus && <p>{getErrorMessage(logoutStatus)}</p>}
			</div>
		</div>
	);
};

export default LogoutView;
