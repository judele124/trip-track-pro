import { MouseEvent, useEffect, useRef } from "react";
import Button from "../../ui/Button";
import { useDropdown } from "./Dropdown";

interface IDropdownButtonProps {
  value: string;
  autoFocus?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function DropdownButton({
  value,
  autoFocus,
  onClick,
}: IDropdownButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { toggle, isOpen } = useDropdown();

  useEffect(() => {
    if (autoFocus) buttonRef.current?.focus();
  }, []);

  return (
    <Button
      ref={buttonRef}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
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
      <span>{value}</span>
    </Button>
  );
}
