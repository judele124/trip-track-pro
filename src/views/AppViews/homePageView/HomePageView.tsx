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
import { useCallback } from 'react';

const HomePageView = () => {
	const { user } = useAuthContext();
	const { activate } = useAxios({
		manual: true,
	});

	const handleUpdateUserAvatarInfo = useCallback(
		async ({ name, imageUrl }: { name: string; imageUrl: string }) => {
			if (!user || user.role === 'guest') return;
			await activate({
				url: '/user/profile',
				method: 'PUT',
				data: {
					...user,
					name,
					imageUrl,
				},
			});

			await activate({
				url: '/create-user-tokens',
			});
		},
		[user]
	);

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
					<Button className='w-full'>Join a trip</Button>
				</div>
			</div>

			{user && user.role === 'user' && (
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
