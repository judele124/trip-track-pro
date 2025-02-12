import { useRef } from 'react';
import Icon from '../../../icons/Icon';
import Button from '../../../ui/Button';
import Sidemenu from './Sidemenu';
import useToggle from '../../../../hooks/useToggle';

export default function TopNavigation({ title }: { title: string }) {
	const { toggle: toggleMenu, isOpen: isMenuOpen } = useToggle(false);
	const toggleMenuRef = useRef<HTMLButtonElement>(null);
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

				<Button className='bg-transparent px-0 py-0'>
					<Icon className='fill-dark dark:fill-light' name='user' />
				</Button>
			</div>
		</div>
	);
}
