import { createContext, ReactNode, useContext, useState } from "react";
import useToggle from "../../../hooks/useToggle";

interface IDropdownContext<T> {
  list: T[];
  selectedDisplayValue: string;
  selectedIndex: number;
  suggestedIndex: number;
  isOpen: boolean;
  setSelectedIndex: (index: number) => void;
  setSuggestedIndex: (index: number) => void;
  incrementSuggestedIndex: () => void;
  decrementSuggestedIndex: () => void;
  handleSelection: (index: number) => void;
  close: () => void;
  open: () => void;
  toggle: () => void;
  handleOnInputValueChange: (value: string) => void;
}

interface IDropdownProviderProps<
  T extends Record<string, any>,
  K extends string & keyof T,
> {
  title: string;
  displayKey: K;
  children: ReactNode;
  initial?: number;
  setSelected: (item: T) => void;
  list: T[];
}

const DropdownContext = createContext<IDropdownContext<any> | null>(null);

export default function DropdownProvider<
  T extends Record<string, any>,
  K extends string & keyof T,
>({
  children,
  initial = -1,
  setSelected,
  list,
  displayKey,
  title,
}: IDropdownProviderProps<T, K>) {
  const { isOpen, setIsOpen, toggle } = useToggle(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(initial);
  const [suggestedIndex, setSuggestedIndex] = useState<number>(initial);

  const incrementSuggestedIndex = () =>
    setSuggestedIndex((prev) => Math.max(prev - 1, 0));
  const decrementSuggestedIndex = () =>
    setSuggestedIndex((prev) => Math.min(prev + 1, list.length - 1));

  const handleSelection = (index: number) => {
    setSelectedIndex(index);
    setSelected(list[index]);
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider
      value={{
        list,
        selectedDisplayValue:
          selectedIndex >= 0 ? list[selectedIndex][displayKey] : title,
        selectedIndex,
        suggestedIndex,
        isOpen,
        toggle,
        close: () => setIsOpen(false),
        open: () => setIsOpen(true),
        incrementSuggestedIndex,
        decrementSuggestedIndex,
        handleSelection,
        setSuggestedIndex,
        setSelectedIndex,
        handleOnInputValueChange: (value: string) => {
          const regExp = new RegExp(value, "i");
          const index = list.findIndex((item) =>
            regExp.test(String(item[displayKey])),
          );
          if (index !== -1) {
            setSuggestedIndex(index);
          }
        },
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider",
    );
  }
  return context;
};
