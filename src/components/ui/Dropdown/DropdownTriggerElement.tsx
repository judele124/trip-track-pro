import DropdownInput from "./DropdownInput";
import DropdownButton from "./DropdownButton";
import { useDropdown } from "./Dropdown";
import { ChangeEvent, MouseEvent } from "react";
import { IconName } from "@/components/icons/Icon";

type CommonDropdownTriggerElementProps<T> = {
  elemTextContent: (selectedItem: T | undefined | null) => string;
  autoFocus?: boolean;
  icon?: IconName;
  iconFill?: string;
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
  iconFill,
  elemTextContent: value,
  type,
  autoFocus = false,
  onChange,
  onClick,
  ...props
}: IDropdownTriggerElementProps<T>) {
  const { list, selectedIndex } = useDropdown<T>();

  if (type === "input") {
    return (
      <DropdownInput
        {...props}
        icon={icon}
        iconFill={iconFill}
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
      iconFill={iconFill}
    />
  );
}
