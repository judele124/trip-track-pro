import { createContext, useContext, useEffect, useState } from "react";
import useToggle from "../../hooks/useToggle";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface IDropdownContext<T> {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  toggleIsSelectOpen: () => void;
  isSelectOpen: boolean;
  selectedElement: T;
}

interface IDropdownProps<T, K extends keyof T> {
  displayKey: K;
  selectedElement: T;
  list: T[];
  setSelected: (option: T) => void;
}

const DropdownContext = createContext<IDropdownContext<any> | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error("useDropdown must be used within a DropdownProvider");
  return context;
};

export default function Dropdown<
  T extends Record<K, string>,
  K extends keyof T,
>({ displayKey, selectedElement, list, setSelected }: IDropdownProps<T, K>) {
  const { isOpen: isSelectOpen, toggle: toggleIsSelectOpen } = useToggle(false);
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <DropdownContext.Provider
      value={{
        toggleIsSelectOpen,
        isSelectOpen,
        setSelectedValue,
        selectedValue,
        selectedElement,
      }}
    >
      <div className="relative w-full">
        {/* Dropdown Toggle */}
        <Dropdown.TriggerElement triggetType="input" />

        {/* Dropdown List */}
        {isSelectOpen && (
          <ul
            className="absolute top-12 z-10 flex max-h-60 w-full flex-col overflow-y-auto rounded-2xl border-primary bg-white shadow-lg"
            role="listbox"
          >
            {list.map((item) => (
              <li>
                <Button
                  key={item[displayKey]}
                  className={`w-full text-start ${
                    item === selectedElement
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 hover:text-dark"
                  }`}
                  onClick={() => {
                    toggleIsSelectOpen();
                    setSelected(item);
                    setSelectedValue(item[displayKey]);
                  }}
                  role="option"
                  aria-selected={item === selectedElement}
                >
                  {item[displayKey]}
                  {item === selectedElement && <span className="ml-2">✅</span>}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.ArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`mr-2 inline-block size-5 ${className}`}
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 70.79 137.38"
    >
      <path d="M0,134.38V3A3,3,0,0,1,5.14.9L69.92,66.59a3,3,0,0,1,0,4.21L5.14,136.48A3,3,0,0,1,0,134.38Z" />
    </svg>
  );
};

Dropdown.TriggerElement = ({
  triggetType,
}: {
  triggetType?: "input" | "button";
}) => {
  const { isSelectOpen, toggleIsSelectOpen, selectedValue, setSelectedValue } =
    useDropdown();

  if (triggetType === "input") {
    return (
      <div
        className="relative"
        aria-haspopup="listbox"
        aria-expanded={isSelectOpen}
      >
        <Input
          value={selectedValue}
          onBlur={toggleIsSelectOpen}
          onFocus={toggleIsSelectOpen}
          onChange={(e) => {
            setSelectedValue(e.target.value);
          }}
          name="asd"
        />
      </div>
    );
  }

  return (
    <button
      onClick={toggleIsSelectOpen}
      className="flex w-full items-center justify-between rounded-2xl bg-gray-100 px-5 py-2 text-left"
      aria-haspopup="listbox"
      aria-expanded={isSelectOpen}
    >
      <span>{selectedValue}</span>
      <Dropdown.ArrowIcon />
    </button>
  );
};
