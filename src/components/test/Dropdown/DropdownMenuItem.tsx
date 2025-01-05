import { useEffect, useRef } from "react";
import Button from "../../ui/Button";
import { useDropdown } from "./Dropdown";
import { RenderItem } from "./DropdownMenu";

interface IDropdownMenuItemProps<T> {
  renderItem: RenderItem<T>;
  item: any;
  iconSrc?: string;
  i: number;
  isSuggested: boolean;
  isSelected: boolean;
}

export default function DropdownMenuItem<T>({
  renderItem,
  item,
  isSelected,
  isSuggested,
  i,
}: IDropdownMenuItemProps<T>) {
  const { setSelectedIndex, setSuggestedIndex, close } = useDropdown();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuggested) {
      ref.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isSuggested]);

  return (
    <li>
      <Button
        onFocus={() => setSuggestedIndex(i)}
        onMouseLeave={() => setSuggestedIndex(-1)}
        onMouseEnter={() => setSuggestedIndex(i)}
        onClick={() => {
          setSelectedIndex(i);
          close();
        }}
        ref={ref}
        className={`hover:bg-gray-200" flex w-full items-center gap-2 rounded-xl text-start ${isSelected ? "bg-secondary text-white" : isSuggested ? "bg-gray-200" : " "}`}
        role="option"
        aria-selected={isSelected}
      >
        {renderItem({ isSelected, item })}
      </Button>
    </li>
  );
}
