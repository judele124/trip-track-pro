import { useRef, useState } from 'react';
import Icon from '../../../icons/Icon';
import Button from '../../../ui/Button';
import Sidemenu from './Sidemenu';
import useToggle from '../../../../hooks/useToggle';
import { useAuthContext } from '@/contexts/AuthContext';
import UserProfileModal from './UserProfileModal';
import { useTripSocket } from '@/contexts/socketContext/SocketContext';

export default function TopNavigation({
	title,
	setRef,
}: {
	title: string;
	setRef?: (ref: HTMLDivElement) => void;
}) {
	const { user } = useAuthContext();
	const { urgentNotifications } = useTripSocket();
	const { toggle: toggleUserProfile, isOpen: isUserProfileOpen } =
		useToggle(false);
	const { toggle: toggleMenu, isOpen: isMenuOpen } = useToggle(false);
	const [unreadUrgentNotifications, setUnreadUrgentNotifications] = useState(0);
	const toggleMenuRef = useRef<HTMLButtonElement>(null);

	return (
		<div
			ref={(node) => {
				if (node) {
					setRef?.(node);
				}
			}}
			id='trip-top-navigation'
			className='page-colors page-x-padding flex flex-row justify-between py-4'
		>
			{/* left side */}
			<div className='flex flex-row items-center gap-4'>
				<Button
					ref={toggleMenuRef}
					onClick={toggleMenu}
					className='bg-transparent px-0 py-0'
				>
					<Icon className='fill-primary' name='menu' />
				</Button>

				<h4>{title}</h4>
			</div>

			<Sidemenu
				toggleMenuRef={toggleMenuRef}
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>

			{/* right side */}

			<div className='flex flex-row items-center gap-4'>
				<Button
					onClick={() =>
						setUnreadUrgentNotifications(urgentNotifications.length)
					}
					className='bg-transparent px-0 py-0'
				>
					<Icon
						className='fill-dark dark:fill-light'
						name='alert'
						notificationCount={
							urgentNotifications.length - unreadUrgentNotifications
						}
					/>
				</Button>

				<Button
					onClick={toggleUserProfile}
					className='bg-transparent px-0 py-0'
				>
					{user?.name ? (
						<img
							className='size-10 rounded-full bg-slate-400'
							src={user.imageUrl || `https://robohash.org/${user.name}.png`}
							alt={`${user.name} profile picture`}
						/>
					) : (
						<Icon className='fill-dark dark:fill-light' name='user' />
					)}
					<UserProfileModal
						onClose={toggleUserProfile}
						open={isUserProfileOpen}
					/>
				</Button>
			</div>
		</div>
	);
}
