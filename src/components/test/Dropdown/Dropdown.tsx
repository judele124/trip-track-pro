import { useState, useRef, useEffect } from "react";
import useToggle from "../../../hooks/useToggle";
import DropdownMenu from "./DropdownMenu";
import DropdownTriggerElement from "./DropdownTriggerElement";

interface IDropdownProps<T, K extends keyof T> {
  displayKey: K;
  list: T[];
  setSelected: (item: T) => void;
  type: "input" | "button";
  initialSelected?: number;
  autoFocus?: boolean;
}

export default function Dropdown<
  T extends Record<K, string>,
  K extends keyof T,
>({
  type,
  setSelected,
  displayKey,
  list,
  initialSelected = -1,
  autoFocus = false,
}: IDropdownProps<T, K>) {
  const { isOpen, setIsOpen } = useToggle(false);
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);
  const [suggestedIndex, setSuggestedIndex] = useState(initialSelected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      if (isOpen) setIsOpen(false);
    }
  };

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "ArrowDown":
        setSuggestedIndex((prev) => Math.min(prev + 1, list.length - 1));
        break;
      case "ArrowUp":
        setSuggestedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        setSelectedIndex(suggestedIndex);
        setSelected(list[suggestedIndex]);
        setIsOpen(false);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const hendleInputValueChange = (value: string) => {
    const regExp = new RegExp(value, "i");
    const index = list.findIndex((item) =>
      regExp.test(String(item[displayKey])),
    );
    if (index !== -1) {
      setSuggestedIndex(index);
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

  const selectedValue =
    selectedIndex >= 0 ? list[selectedIndex][displayKey] : "";

  return (
    <div className="relative w-full">
      {type === "input" ? (
        <DropdownTriggerElement
          selectedValue={selectedValue}
          autoFocus={autoFocus}
          onInputValueChange={hendleInputValueChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type={type}
        />
      ) : (
        <DropdownTriggerElement
          selectedValue={selectedValue}
          autoFocus={autoFocus}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type={type}
        />
      )}
      {isOpen && (
        <DropdownMenu
          selectedIndex={selectedIndex}
          suggestedIndex={suggestedIndex}
          onSelect={(i) => setSelectedIndex(i)}
          list={list}
          displayKey={displayKey}
        />
      )}
    </div>
  );
}
