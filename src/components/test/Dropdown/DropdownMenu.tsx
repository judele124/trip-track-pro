import DropdownMenuItem from "./DropdownMenuItem";

interface IDropdownMenuProps<T> {
  list: T[];
  displayKey: keyof T;
  onSelect: (index: number) => void;
  selectedIndex?: number;
  suggestedIndex: number;
}

export default function DropdownMenu<T>({
  list,
  displayKey,
  onSelect,
  selectedIndex,
  suggestedIndex,
}: IDropdownMenuProps<T>) {
  return (
    <ul
      className="absolute top-14 z-10 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-lg"
      role="listbox"
    >
      {list.map((item, i) => (
        <DropdownMenuItem
          i={i}
          key={i}
          displayValue={String(item[displayKey])}
          onClick={() => onSelect(i)}
          isSelected={selectedIndex === i}
          isSuggested={i === suggestedIndex}
        />
      ))}
    </ul>
  );
}
