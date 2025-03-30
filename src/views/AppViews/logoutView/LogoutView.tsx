import { useAuthContext } from '@/contexts/AuthContext';
import ImageLightDark from '@/components/ui/ImageLightDark';
import imgSrcLight from '@/views/AppViews/homePageView/assets/start-screen-light.svg';
import imgSrcDark from '@/views/AppViews/homePageView/assets/start-screen-dark.svg';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { useState } from 'react';
const LogoutView = () => {
	const { logout, logoutError, user } = useAuthContext();
	const [isClicked, setIsClicked] = useState(false);

	return (
		<div className='mt-10 flex flex-col'>
			<Logo />
			<ImageLightDark
				className='mx-auto blur-sm'
				srcDark={imgSrcDark}
				srcLight={imgSrcLight}
				alt='rocket'
			/>
			<div className='page-colors page-padding absolute top-1/2 m-4 flex -translate-y-1/2 flex-col gap-3 rounded-2xl border-4 border-dark text-white dark:border-primary'>
				{!isClicked ? (
					<>
						<h1 className='text-2xl'>Goodbye {user?.name}!</h1>
						<p className='text-pretty'>
							Thank you for joining us on this journey! We hope you had a great
							time exploring with us.
						</p>
						<p className='text-xs text-red-700'>
							*You will need to sign in again to access your account.
						</p>
						<Button
							className='border-2 border-primary bg-black text-primary'
							onClick={() => {
								setIsClicked(true);
								logout();
							}}
						>
							Log out
						</Button>

						<Button
							primary
							className='-mt-2'
							onClick={() => {
								history.back();
								setIsClicked(false);
							}}
						>
							Cancel
						</Button>
					</>
				) : (
					<>
						{logoutError && isClicked ? (
							<p className='text-red-700'>{logoutError.message}</p>
						) : (
							<p className='text-lg text-black dark:text-white'>
								The journey never truly ends! We’ll be waiting for you to
								continue your adventure.
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default LogoutView;
