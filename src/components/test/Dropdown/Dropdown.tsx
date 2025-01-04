import { useEffect, useRef } from "react";
import { useDropdownContext } from "./DropdownProvider";
import DropdownTriggerElement from "./DropdownTriggerElement";
import DropdownMenu from "./DropdownMenu";

export default function Dropdown<T>({
  displayKey,
  type,
  autoFocus,
  list,
}: {
  displayKey: keyof T;
  type: "input" | "button";
  autoFocus?: boolean;
  list: T[];
}) {
  const {
    suggestedIndex,
    isOpen,
    decrementSuggestedIndex,
    incrementSuggestedIndex,
    handleSelection,
    close,
    open,
  } = useDropdownContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      if (isOpen) close();
    }
  };

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "ArrowDown":
        decrementSuggestedIndex();
        break;
      case "ArrowUp":
        incrementSuggestedIndex();
        break;
      case "Enter":
        handleSelection(suggestedIndex);
        break;
      case "Escape":
        open();
        break;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [suggestedIndex, isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <DropdownTriggerElement autoFocus={autoFocus} type={type} />
      {isOpen && <DropdownMenu list={list} displayKey={displayKey} />}
    </div>
  );
}
