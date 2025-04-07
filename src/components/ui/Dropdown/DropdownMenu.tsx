import DropdownMenuItem from './DropdownMenuItem';
import { useDropdown } from './Dropdown';
import { ReactNode, RefObject, useEffect } from 'react';
import Modal from '../Modal';

export type RenderItem<T> = ({
	isSelected,
	item,
}: {
	isSelected: boolean;
	item: T;
}) => ReactNode;

interface IDropdownMenuProps<T> {
	renderItem: RenderItem<T>;
	setSelected: (item: T) => void;
	anchorElement: RefObject<HTMLElement>;
}

export default function DropdownMenu<T>({
	renderItem,
	setSelected,
	anchorElement,
}: IDropdownMenuProps<T>) {
	const {
		selectedIndex,
		suggestedIndex,
		isOpen,
		list,
		setSelectedIndex,
		decrementSuggestedIndex,
		incrementSuggestedIndex,
		close,
		open,
	} = useDropdown<T>();

	const handleSelection = (index: number) => {
		setSelectedIndex(index);
		setSelected(list![index]);
		close();
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown':
				incrementSuggestedIndex();
				break;
			case 'ArrowUp':
				decrementSuggestedIndex();
				break;
			case 'Enter':
				handleSelection(suggestedIndex);
				break;
			case 'Escape':
				close();
				break;
		}
	};

	useEffect(() => {
		if (!list || !list.length) return;
		open();
	}, [list]);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [suggestedIndex, isOpen]);

	useEffect(() => {
		if (!list || !list.length || selectedIndex < 0) return;
		setSelected(list[selectedIndex]);
	}, [selectedIndex]);

	if (!list || !list.length || !anchorElement.current) return null;

	const { width: anchorElementWidth } =
		anchorElement.current.getBoundingClientRect();

	return (
		<Modal
			onBackdropClick={close}
			backgroundClassname='bg-transparent backdrop-blur-0'
			containerStyles={{ width: anchorElementWidth }}
			open={isOpen}
			anchorElement={anchorElement}
			anchorTo='top'
		>
			<ul
				onMouseOver={(e) => e.stopPropagation()}
				className='max-h-60 w-full overflow-y-auto rounded-2xl border-2 border-dark bg-white shadow-lg'
				role='listbox'
			>
				{list.map((item, i) => (
					<DropdownMenuItem
						item={item}
						renderItem={renderItem}
						isSelected={selectedIndex === i}
						isSuggested={i === suggestedIndex}
						i={i}
						key={i}
					/>
				))}
			</ul>
		</Modal>
	);
}
