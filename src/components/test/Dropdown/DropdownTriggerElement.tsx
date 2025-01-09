import DropdownInput from "./DropdownInput";
import DropdownButton from "./DropdownButton";
import { useDropdown } from "./Dropdown";
import { ChangeEvent, MouseEvent } from "react";

type CommonDropdownTriggerElementProps<T> = {
  elemTextContent: (selectedItem: T | undefined | null) => string;
  autoFocus?: boolean;
  icon?: JSX.Element;
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

export default function DropdownTriggerElement<T>({
  icon,
  elemTextContent: value,
  type,
  autoFocus = false,
  onChange,
  onClick,
  ...props
}: IDropdownTriggerElementProps<T>) {
  const { list, selectedIndex } = useDropdown<T>();

  icon = icon && (
    <i className="absolute left-3 top-1/2 size-6 -translate-y-1/2">{icon}</i>
  );

  if (type === "input") {
    return (
      <DropdownInput
        {...props}
        icon={icon}
        value={value(list?.[selectedIndex])}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    );
  }

  return (
    <DropdownButton
      value={value(list?.[selectedIndex])}
      onClick={onClick}
      autoFocus={autoFocus}
      icon={icon}
    />
  );
}
