import { forwardRef, Ref, useEffect, useState } from "react";
import Input from "../../ui/Input";
import { useDropdownContext } from "./DropdownProvider";

interface IDropdownInputProps {
  initialValue?: string;
}

export default forwardRef(function DropdownInput(
  { initialValue }: IDropdownInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const { selectedDisplayValue, handleOnInputValueChange, open, isOpen } =
    useDropdownContext();
  const [inputValue, setInputValue] = useState(initialValue || "");

  useEffect(() => {
    setInputValue(initialValue || "");
  }, []);

  useEffect(() => {
    setInputValue(selectedDisplayValue);
  }, [selectedDisplayValue]);

  return (
    <Input
      ref={ref}
      name="testDropdown"
      value={inputValue}
      onChange={(e) => {
        handleOnInputValueChange(e.target.value);
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
});
