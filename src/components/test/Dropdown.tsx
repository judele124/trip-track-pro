import { useEffect, useState } from "react";
import useToggle from "../../hooks/useToggle";
import Input from "../ui/Input";

interface IDropdownProps<T, K extends keyof T> {
  displayKey: K;
  selected: T;
  list: T[];
  setSelected: (option: T) => void;
}

export default function Dropdown<
  T extends Record<K, string>,
  K extends keyof T,
>({ displayKey, selected, list, setSelected }: IDropdownProps<T, K>) {
  const { isOpen: isSelectOpen, toggle: toggleIsSelectOpen } = useToggle(true);
  const [inputValue, setInputValue] = useState("");

  const handleOptionClick = (item: T) => {
    toggleIsSelectOpen();
    setSelected(item);
  };

  useEffect(() => {
    console.log("asdasd");
    setInputValue(selected[displayKey]);
  }, [selected]);

  return (
    <div className="relative w-full">
      {/* Dropdown Toggle */}
      <div
        className="relative"
        aria-haspopup="listbox"
        aria-expanded={isSelectOpen}
      >
        <Input
          value={inputValue}
          onBlur={toggleIsSelectOpen}
          onFocus={toggleIsSelectOpen}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="pl-10"
          name="asd"
        />
        <Dropdown.DropdownArrowIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
      </div>

      {/* <button
        onClick={toggleIsSelectOpen}
        className="flex w-full items-center justify-between rounded-2xl bg-gray-100 px-5 py-2 text-left"
        aria-haspopup="listbox"
        aria-expanded={isSelectOpen}
      >
        <span>{selected[displayKey]}</span>
        <Dropdown.DropdownArrowIcon />
      </button> */}

      {/* Dropdown List */}
      {isSelectOpen && (
        <ul
          className="absolute top-12 z-10 flex max-h-60 w-full flex-col overflow-y-auto rounded-2xl border-primary bg-white shadow-lg"
          role="listbox"
        >
          {list.map((item) => (
            <button
              key={item[displayKey]}
              className={`cursor-pointer px-5 py-2 hover:bg-gray-200 ${
                item === selected ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                console.log("asd");

                handleOptionClick(item);
              }}
              role="option"
              aria-selected={item === selected}
            >
              {item[displayKey]}
              {item === selected && <span className="ml-2">✅</span>}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.DropdownArrowIcon = ({ className }: { className?: string }) => {
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
