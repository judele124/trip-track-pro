import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
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
        ref={inputRef}
        className={`w-full ${icon ? "pl-10" : ""}`}
        textarea={false}
        value={inputValue}
        onChange={(e) => {
          onChange?.(e as ChangeEvent<HTMLInputElement>);
          setInputValue(e.target.value);
          open();
        }}
        onFocus={() => open()}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          open();
          if (e.key === "Escape") {
            e.currentTarget.blur();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...props}
      />
    </div>
  );
}
