import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import imgSrcLight from './assets/start-screen-light.svg';
import imgSrcDark from './assets/start-screen-dark.svg';
import Button from '@/components/ui/Button';
import ImageLightDark from '@/components/ui/ImageLightDark';
import { navigationRoutes } from '@/Routes/routes';
import UserInputNameModal from '@/components/UserInputNameModal';
import { useAuthContext } from '@/contexts/AuthContext';
import useAxios from '@/hooks/useAxios';
import useToggle from '@/hooks/useToggle';
import { useEffect } from 'react';

const HomePageView = () => {
	const { user, handleTokenValidation } = useAuthContext();
	const { activate } = useAxios({
		manual: true,
	});

	const { isOpen: isNameModalOpen, setIsOpen: setIsNameModalOpen } =
		useToggle();

	useEffect(() => {
		if (user && user.role === 'user' && !user.name) {
			setIsNameModalOpen(true);
		} else {
			setIsNameModalOpen(false);
		}
	}, [user]);

	const handleUpdateUserAvatarInfo = async ({
		name,
		imageUrl,
	}: {
		name: string;
		imageUrl: string;
	}) => {
		if (!user || user.role === 'guest') return;
		const { email, role } = user;

		const { status } = await activate({
			url: '/user/profile',
			method: 'PUT',
			data: {
				email,
				role,
				name,
				imageUrl,
			},
		});

		if (status >= 200 && status < 300) {
			await activate({
				url: '/auth/create-user-tokens',
			});

			await handleTokenValidation();

			setIsNameModalOpen(false);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-4'>
				<Logo />
				<ImageLightDark
					srcDark={imgSrcDark}
					srcLight={imgSrcLight}
					alt='illustration of a map'
				/>
				<div>
					<Link to={navigationRoutes.createTrip}>
						<Button primary className='mb-1 w-full'>
							Create a new trip
						</Button>
					</Link>
					{user ? (
						<Link to={navigationRoutes.profile}>
							<Button className='flex w-full items-center justify-center gap-4'>
								{user.name}'s Profile
							</Button>
						</Link>
					) : (
						<Link to={navigationRoutes.login}>
							<Button className='w-full'>Login</Button>
						</Link>
					)}
				</div>
			</div>

			{isNameModalOpen && (
				<UserInputNameModal
					onSubmit={({ name, imageUrl }) => {
						handleUpdateUserAvatarInfo({ name, imageUrl });
					}}
				/>
			)}
		</>
	);
};

export default HomePageView;
