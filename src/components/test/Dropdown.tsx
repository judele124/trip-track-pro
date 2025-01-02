import { useState, useRef, useEffect } from "react";
import useToggle from "../../hooks/useToggle";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface IDropdownProps<T, K extends keyof T> {
  displayKey: K;
  list: T[];
  selected: T;
  setSelected: (option: T) => void;
  triggerType?: "input" | "button";
}

export default function Dropdown<
  T extends Record<K, string>,
  K extends keyof T,
>({
  displayKey,
  list,
  selected,
  setSelected,
  triggerType = "button",
}: IDropdownProps<T, K>) {
  const { isOpen, toggle } = useToggle(false);
  const [inputValue, setInputValue] = useState(selected[displayKey] || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: T) => {
    setSelected(item);
    setInputValue(item[displayKey]);
    toggle();
  };

  const handleInputFocus = () => {
    if (!isOpen) toggle();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      if (isOpen) toggle();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Element */}
      {triggerType === "input" ? (
        <Input
          name="input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={handleInputFocus}
          className="w-full"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        />
      ) : (
        <Button
          onClick={toggle}
          className="flex w-full items-center justify-between"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{inputValue || "Select an option"}</span>
          <svg
            className={`mr-2 inline-block size-5`}
            viewBox="0 0 70.79 137.38"
          >
            <path d="M0,134.38V3A3,3,0,0,1,5.14.9L69.92,66.59a3,3,0,0,1,0,4.21L5.14,136.48A3,3,0,0,1,0,134.38Z" />
          </svg>
        </Button>
      )}

      {/* Dropdown List */}
      {isOpen && (
        <ul
          className="absolute top-12 z-10 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-lg"
          role="listbox"
        >
          {list.map((item) => (
            <li key={item[displayKey]}>
              <Button
                onClick={() => handleSelect(item)}
                className={`w-full text-start ${
                  item === selected
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200"
                }`}
                role="option"
                aria-selected={item === selected}
              >
                {item[displayKey]}
                {item === selected && <span className="ml-2">✅</span>}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
