import DropdownInput from "./DropdownInput";
import DropdownButton from "./DropdownButton";
import { useDropdown } from "./Dropdown";

interface IDropdownTriggerElementProps<T> {
  value: (selectedItem: T | undefined | null) => string;
  type: "input" | "button";
  autoFocus?: boolean;
}

export default function DropdownTriggerElement<T>({
  value,
  type,
  autoFocus = false,
}: IDropdownTriggerElementProps<T>) {
  const { list, selectedIndex } = useDropdown<T>();

  if (type === "input") {
    return (
      <DropdownInput value={value(list[selectedIndex])} autoFocus={autoFocus} />
    );
  }
  return (
    <DropdownButton value={value(list[selectedIndex])} autoFocus={autoFocus} />
  );
}
