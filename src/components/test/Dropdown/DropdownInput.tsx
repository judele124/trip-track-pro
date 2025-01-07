import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "../../ui/Input";
import { useDropdown } from "./Dropdown";

interface IDropdownInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  value: string;
  autoFocus: boolean;
}

export default function DropdownInput({
  icon,
  value,
  autoFocus,
  onChange,
  ...props
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
    <div className="relative">
      {icon}
      <Input
        className={`w-full ${icon ? "pl-10" : ""}`}
        {...props}
        ref={inputRef}
        textarea={false}
        name="testDropdown"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          open();
          onChange?.(e as ChangeEvent<HTMLInputElement>);
        }}
        onFocus={() => open()}
        onKeyDown={(e) => {
          open();
          if (e.key === "Escape") {
            e.currentTarget.blur();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      />
    </div>
  );
}
