import { forwardRef, Ref, useEffect, useState } from "react";
import Input from "../../ui/Input";

interface IDropdownInputProps {
  selectedValue: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onInputValueChange: (value: string) => void;
  initialValue?: string;
}

export default forwardRef(function DropdownInput(
  {
    selectedValue,
    onInputValueChange,
    isOpen,
    setIsOpen,
    initialValue,
  }: IDropdownInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const [inputValue, setInputValue] = useState(initialValue || "");

  useEffect(() => {
    setInputValue(initialValue || "");
  }, []);

  useEffect(() => {
    setInputValue(selectedValue);
  }, [selectedValue]);

  return (
    <Input
      ref={ref}
      name="testDropdown"
      value={inputValue}
      onChange={(e) => {
        onInputValueChange(e.target.value);
        setInputValue(e.target.value);
        setIsOpen(true);
      }}
      onFocus={() => setIsOpen(true)}
      onKeyDown={(e) => {
        setIsOpen(true);
        if (e.key === "Escape") {
          e.currentTarget.blur();
        }
      }}
      className="w-full"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    />
  );
});
