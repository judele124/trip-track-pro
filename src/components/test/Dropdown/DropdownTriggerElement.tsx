import DropdownInput from "./DropdownInput";
import Button from "../../ui/Button";
import { useEffect, useRef } from "react";

interface CommonValueProps {
  selectedValue: string;
  type: "input" | "button";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  autoFocus?: boolean;
}

type IDropdownTriggerElementProps = CommonValueProps &
  (
    | {
        type: "input";
        onInputValueChange: (value: string) => void;
      }
    | { type: "button"; onInputValueChange?: undefined }
  );

export default function DropdownTriggerElement({
  selectedValue,
  isOpen,
  setIsOpen,
  type,
  onInputValueChange,
  autoFocus = false,
}: IDropdownTriggerElementProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    inputRef.current?.focus();
    buttonRef.current?.focus();
  }, []);

  if (type === "input") {
    return (
      <DropdownInput
        selectedValue={selectedValue}
        ref={inputRef}
        onInputValueChange={onInputValueChange}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    );
  }

  return (
    <Button
      ref={buttonRef}
      onClick={() => setIsOpen(!isOpen)}
      className="flex w-full items-center justify-start"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <svg
        className={`mr-2 inline-block size-5 transition-all ${isOpen ? "rotate-90" : ""}`}
        viewBox="0 0 70.79 137.38"
      >
        <path d="M0,134.38V3A3,3,0,0,1,5.14.9L69.92,66.59a3,3,0,0,1,0,4.21L5.14,136.48A3,3,0,0,1,0,134.38Z" />
      </svg>
      <span>{selectedValue}</span>
    </Button>
  );
}
