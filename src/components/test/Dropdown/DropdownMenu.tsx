import DropdownMenuItem from "./DropdownMenuItem";
import { useDropdown } from "./Dropdown";
import { ReactNode, useEffect, useRef } from "react";

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
}

export default function DropdownMenu<T>({
  renderItem,
  setSelected,
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
  } = useDropdown<T>();

  const handleSelection = (index: number) => {
    setSelectedIndex(index);
    setSelected(list![index]);
    close();
  };

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "ArrowDown":
        decrementSuggestedIndex();
        break;
      case "ArrowUp":
        incrementSuggestedIndex();
        break;
      case "Enter":
        handleSelection(suggestedIndex);
        break;
      case "Escape":
        close();
        break;
    }
  };

  useEffect(() => {
    if (!isOpen || !list || !list.length) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [suggestedIndex, isOpen, list]);

  useEffect(() => {
    if (!list || !list.length || selectedIndex < 0) return;
    console.log(list[selectedIndex]);

    setSelected(list[selectedIndex]);
  }, [selectedIndex]);

  if (!list || !list.length || !isOpen) return null;

  return (
    <ul
      onMouseOver={(e) => e.stopPropagation()}
      className="absolute top-14 z-10 max-h-60 w-full overflow-y-auto rounded-2xl border-2 border-dark bg-white shadow-lg"
      role="listbox"
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
  );
}
