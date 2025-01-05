import {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import useToggle from "../../../hooks/useToggle";
import { useCounter } from "../../../hooks/useCounter";
import DropdownMenu from "./DropdownMenu";
import DropdownTriggerElement from "./DropdownTriggerElement";
import { validateRequiredChildren } from "../../../utils/functions";

interface IDropdownContext<T> {
  list: T[];
  selectedIndex: number;
  suggestedIndex: number;
  isOpen: boolean;
  setSelectedIndex: (index: number) => void;
  setSuggestedIndex: (index: number) => void;
  incrementSuggestedIndex: () => void;
  decrementSuggestedIndex: () => void;
  close: () => void;
  open: () => void;
  toggle: () => void;
}

interface IDropdownProps<T> {
  initial?: number;
  children: ReactNode;
  list: T[];
}

const DropdownContext = createContext<IDropdownContext<any> | null>(null);

export default function Dropdown<T>({
  initial = -1,
  children,
  list,
}: IDropdownProps<T>) {
  const MustHaveChildren = [DropdownMenu, DropdownTriggerElement];
  validateRequiredChildren(children, MustHaveChildren);

  const { isOpen, setIsOpen, toggle } = useToggle(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const {
    count: suggestedIndex,
    setCount: setSuggestedIndex,
    increment: incrementSuggestedIndex,
    decrement: decrementSuggestedIndex,
  } = useCounter({
    length: list.length,
    initial,
  });

  const { count: selectedIndex, setCount: setSelectedIndex } = useCounter({
    length: list.length,
    initial,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node) && isOpen) {
      close();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        list,
        selectedIndex,
        suggestedIndex,
        isOpen,
        setSelectedIndex,
        setSuggestedIndex,
        incrementSuggestedIndex,
        decrementSuggestedIndex,
        close,
        open,
        toggle,
      }}
    >
      <div ref={dropdownRef} className="relative w-full">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function useDropdown<T>() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("useDropdown must be used within a Dropdown");
  return context as IDropdownContext<T>;
}
