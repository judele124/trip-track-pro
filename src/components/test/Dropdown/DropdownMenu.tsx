import DropdownMenuItem from "./DropdownMenuItem";
import { useDropdownContext } from "./DropdownProvider";

interface IDropdownMenuProps<T> {
  list: T[];
  displayKey: keyof T;
}

export default function DropdownMenu<T>({
  list,
  displayKey,
}: IDropdownMenuProps<T>) {
  const { selectedIndex, suggestedIndex } = useDropdownContext();
  return (
    <ul
      onMouseOver={(e) => e.stopPropagation()}
      className="absolute top-14 z-10 max-h-60 w-full overflow-y-auto rounded-2xl border-2 border-dark bg-white shadow-lg"
      role="listbox"
    >
      {list.map((item, i) => (
        <DropdownMenuItem
          displayValue={String(item[displayKey])}
          isSelected={selectedIndex === i}
          isSuggested={i === suggestedIndex}
          i={i}
          key={i}
        />
      ))}
    </ul>
  );
}
