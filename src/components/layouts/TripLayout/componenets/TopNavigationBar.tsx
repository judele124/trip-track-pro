import { useRef } from 'react';
import Icon from '../../../icons/Icon';
import Button from '../../../ui/Button';
import Sidemenu from './Sidemenu';
import useToggle from '../../../../hooks/useToggle';
import { useAuthContext } from '@/contexts/AuthContext';
import UserProfileModal from './UserProfileModal';

export default function TopNavigation({ title }: { title: string }) {
	const { toggle: toggleUserProfile, isOpen: isUserProfileOpen } =
		useToggle(false);
	const { toggle: toggleMenu, isOpen: isMenuOpen } = useToggle(false);
	const toggleMenuRef = useRef<HTMLButtonElement>(null);
	const { user } = useAuthContext();

	return (
		<div className='page-colors page-x-padding flex flex-row justify-between py-4'>
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
				<Button className='bg-transparent px-0 py-0'>
					<Icon className='fill-dark dark:fill-light' name='alert' />
				</Button>

				<Button
					onClick={toggleUserProfile}
					className='bg-transparent px-0 py-0'
				>
					{user?.name ? (
						<img
							className='size-10 rounded-full bg-slate-400'
							src={`https://robohash.org/${user.name}.png`}
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
