import { useEffect, useRef, useState } from "react";
import Input from "../../ui/Input";
import { useDropdown } from "./Dropdown";

interface IDropdownInputProps {
  value: string;
  autoFocus: boolean;
}

export default function DropdownInput({
  value,
  autoFocus,
}: IDropdownInputProps) {
  const { open, isOpen } = useDropdown();
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value || "");
    if (autoFocus) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Input
      ref={inputRef}
      name="testDropdown"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        open();
      }}
      onFocus={() => open()}
      onKeyDown={(e) => {
        open();
        if (e.key === "Escape") {
          e.currentTarget.blur();
        }
      }}
      className="w-full"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    />
  );
}
