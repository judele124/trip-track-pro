import DropdownInput from "./DropdownInput";
import DropdownButton from "./DropdownButton";
import { useDropdown } from "./Dropdown";
import { ChangeEvent, MouseEvent } from "react";

type CommonDropdownTriggerElementProps<T> = {
  elemTextContent: (selectedItem: T | undefined | null) => string;
  type: "input" | "button";
  autoFocus?: boolean;
};

type IDropdownTriggerElementProps<T> = CommonDropdownTriggerElementProps<T> &
  (
    | {
        type: "input";
        autoFocus?: boolean;
        onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
        onClick?: never;
      }
    | {
        type: "button";
        autoFocus?: boolean;
        onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
        onChange?: never;
      }
  );

// interface IDropdownTriggerElementProps<T> {
//   value: (selectedItem: T | undefined | null) => string;
//   type: "input" | "button";
//   autoFocus?: boolean;
// }

export default function DropdownTriggerElement<T>({
  elemTextContent: value,
  type,
  autoFocus = false,
  onChange,
  onClick,
}: IDropdownTriggerElementProps<T>) {
  const { list, selectedIndex } = useDropdown<T>();

  if (type === "input") {
    return (
      <DropdownInput
        value={value(list[selectedIndex])}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    );
  }

  return (
    <DropdownButton
      value={value(list[selectedIndex])}
      onClick={onClick}
      autoFocus={autoFocus}
    />
  );
}
