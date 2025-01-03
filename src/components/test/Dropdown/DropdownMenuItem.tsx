import { MouseEventHandler, useEffect, useRef } from "react";
import Button from "../../ui/Button";

interface IDropdownMenuItemProps {
  displayValue: string;
  i: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isSuggested: boolean;
  isSelected: boolean;
}

export default function DropdownMenuItem({
  displayValue,
  onClick,
  isSelected,
  isSuggested,
}: IDropdownMenuItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuggested) {
      ref.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isSuggested]);

  return (
    <li>
      <Button
        ref={ref}
        onClick={onClick}
        className={`"hover:bg-gray-200" w-full text-start ${isSelected ? "bg-primary text-white" : isSuggested ? "bg-gray-200" : " "}`}
        role="option"
        aria-selected={isSelected}
      >
        {displayValue}
        {isSelected && <span className="ml-2"> </span>}
      </Button>
    </li>
  );
}
