import {
	ChangeEvent,
	HTMLAttributes,
	InputHTMLAttributes,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import Input from '../Input';
import { useDropdown } from './Dropdown';
import { IconName } from '@/components/icons/Icon';

interface IDropdownInputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: IconName;
	value: string;
	autoFocus: boolean;
	iconFill?: string;
	iconContainerAttributes?: HTMLAttributes<HTMLDivElement>;
}

export default function DropdownInput({
	icon,
	value,
	autoFocus,
	onChange,
	iconFill,
	iconContainerAttributes,
	...props
}: IDropdownInputProps) {
	const { open, isOpen, resetSelectedIndex } = useDropdown();
	const [inputValue, setInputValue] = useState(value || '');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setInputValue(value || '');
		if (autoFocus) inputRef.current?.focus();
	}, []);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return (
		<div className='relative'>
			<Input
				iconContainerAttributes={iconContainerAttributes}
				iconFill={iconFill}
				ref={inputRef}
				icon={icon}
				value={inputValue}
				onChange={(e) => {
					onChange?.(e as ChangeEvent<HTMLInputElement>);
					setInputValue(e.target.value);
					open();
				}}
				onFocus={() => open()}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
					open();
					if (e.key === 'Escape') {
						e.currentTarget.blur();
					}
					if (e.key === 'Backspace') {
						resetSelectedIndex();
					}
					props.onKeyDown?.(e);
				}}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				{...props}
			/>
		</div>
	);
}
