import DropdownInput from "./DropdownInput";
import Button from "../../ui/Button";
import { useEffect, useRef } from "react";
import { useDropdownContext } from "./DropdownProvider";

interface IDropdownTriggerElementProps {
  type: "input" | "button";
  autoFocus?: boolean;
}

export default function DropdownTriggerElement({
  type,
  autoFocus = false,
}: IDropdownTriggerElementProps) {
  const { toggle, selectedDisplayValue, isOpen } = useDropdownContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    inputRef.current?.focus();
    buttonRef.current?.focus();
  }, []);

  if (type === "input") {
    return <DropdownInput ref={inputRef} />;
  }

  return (
    <Button
      ref={buttonRef}
      onClick={() => toggle()}
      className="flex w-full items-center justify-start border-2 border-black bg-white text-dark"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <svg
        className={`mr-2 inline-block size-5 transition-all ${isOpen ? "rotate-90" : ""}`}
        viewBox="0 0 70.79 137.38"
      >
        <path d="M0,134.38V3A3,3,0,0,1,5.14.9L69.92,66.59a3,3,0,0,1,0,4.21L5.14,136.48A3,3,0,0,1,0,134.38Z" />
      </svg>
      <span>{selectedDisplayValue}</span>
    </Button>
  );
}
