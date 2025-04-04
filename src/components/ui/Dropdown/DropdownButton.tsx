import { MouseEvent, useEffect, useRef } from 'react';
import Button from '../Button';
import { useDropdown } from './Dropdown';
import Icon, { IconName } from '@/components/icons/Icon';

interface IDropdownButtonProps {
	icon?: IconName;
	value: string;
	autoFocus?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	iconFill?: string;
}

export default function DropdownButton({
	iconFill,
	icon,
	value,
	autoFocus,
	onClick,
}: IDropdownButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { toggle, isOpen } = useDropdown();

	useEffect(() => {
		if (autoFocus) buttonRef.current?.focus();
	}, []);

	return (
		<Button
			ref={buttonRef}
			onClick={(e) => {
				toggle();
				onClick?.(e);
			}}
			className='flex w-full items-center justify-start border-2 border-black bg-white text-dark'
			aria-haspopup='listbox'
			aria-expanded={isOpen}
		>
			{icon && (
				<div className='absolute left-3 top-1/2 -translate-y-1/2'>
					<Icon fill={iconFill} name={icon} />
				</div>
			)}
			<span className={`${icon ? 'pl-6' : ''}`}>{value}</span>
		</Button>
	);
}
