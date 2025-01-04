import { useEffect, useRef } from "react";
import Button from "../../ui/Button";
import { useDropdownContext } from "./DropdownProvider";

interface IDropdownMenuItemProps {
  displayValue: string;
  i: number;
  isSuggested: boolean;
  isSelected: boolean;
}

export default function DropdownMenuItem({
  displayValue,
  isSelected,
  isSuggested,
  i,
}: IDropdownMenuItemProps) {
  const { setSelectedIndex, setSuggestedIndex, close } = useDropdownContext();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuggested) {
      ref.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isSuggested]);

  return (
    <li>
      <Button
        onFocus={() => setSuggestedIndex(i)}
        onMouseLeave={() => setSuggestedIndex(-1)}
        onMouseEnter={() => setSuggestedIndex(i)}
        onClick={() => {
          setSelectedIndex(i);
          close();
        }}
        ref={ref}
        className={`"hover:bg-gray-200" w-full rounded-xl text-start ${isSelected ? "bg-primary text-white" : isSuggested ? "bg-gray-200" : " "}`}
        role="option"
        aria-selected={isSelected}
      >
        {displayValue}
        {isSelected && <span className="ml-2"> </span>}
      </Button>
    </li>
  );
}
