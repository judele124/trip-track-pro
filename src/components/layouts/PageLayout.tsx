import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import UserInputNameModal from '../UserInputNameModal';
import useToggle from '@/hooks/useToggle';
import { useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { navigationRoutes } from '@/Routes/routes';
import { joinTrip } from '@/servises/tripService';
const PageLayout = () => {
	const { user, handleTokenValidation, handleSetGuestData } = useAuthContext();
	const { isOpen, setIsOpen } = useToggle(false);
	const nav = useNavigate();
	const { state } = useLocation() as { state: { tripId: string } };
	const { activate } = useAxios({
		manual: true,
	});
	useEffect(() => {
		if (user && !user.name) {
			setIsOpen(true);
		}
	}, [user]);

	const handleUpdateUserOrGuestAvatarInfo = async ({
		name,
		imageUrl,
	}: {
		name: string;
		imageUrl: string;
	}) => {
		if (!user) return;
		let finalStatus = 0;
		if (user.role === 'user') {
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
			finalStatus = status;
		}
		if (user.role === 'guest') {
			const { role, _id } = user;
			handleSetGuestData({ guest: { _id, role, name, imageUrl } });
			setIsOpen(false);
		}

		if (finalStatus >= 200 && finalStatus <= 300) {
			await handleTokenValidation();
			setIsOpen(false);
			if (state.tripId) {
				joinTrip(activate, state.tripId, {
					name,
					imageUrl,
					role: user?.role,
				});
				nav(`${navigationRoutes.trip}?tripId=${state.tripId}`);
			}
		}
	};
	return (
		<div className='page-colors page-padding relative flex h-dvh flex-col'>
			<div className='relative flex w-full flex-1 flex-col overflow-hidden sm:mx-auto sm:max-w-[400px]'>
				<Outlet />
				{isOpen && (
					<UserInputNameModal
						onSubmit={({ name, imageUrl }) =>
							handleUpdateUserOrGuestAvatarInfo({ name, imageUrl })
						}
					/>
				)}
			</div>
		</div>
	);
};

export default PageLayout;
