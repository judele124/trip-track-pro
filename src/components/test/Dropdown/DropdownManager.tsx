import DropdownProvider from "./DropdownProvider";
import Dropdown from "./Dropdown";

interface IDropdownProps<T extends Record<K, any>, K extends keyof T> {
  title: string;
  displayKey: K;
  list: T[];
  setSelected: (item: T) => void;
  type: "input" | "button";
  initialSelected?: number;
  autoFocus?: boolean;
}

export default function DropdownManager<
  T extends Record<K, any>,
  K extends keyof T & string,
>({
  title,
  type,
  setSelected,
  displayKey,
  list,
  initialSelected = -1,
  autoFocus = false,
}: IDropdownProps<T, K>) {
  return (
    <DropdownProvider
      displayKey={displayKey}
      title={title}
      initial={initialSelected}
      list={list}
      setSelected={setSelected}
    >
      <Dropdown
        displayKey={displayKey}
        type={type}
        autoFocus={autoFocus}
        list={list}
      />
    </DropdownProvider>
  );
}
