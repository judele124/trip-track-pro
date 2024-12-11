import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from "react";

type IProps = {
  primary?: boolean;
  className?: string;
  title?: string; // Title for the input label
  placeholder?: string;
  isColumn?: boolean; // Determines if layout is column or row
  children: ReactNode[];
} & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>;

const InputWBtnAndLabel = ({
  className = "",
  children,
  primary,
  title,
  placeholder = "",
  isColumn,
  ...props
}: IProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (primary) {
    className += " bg-primary text-white";
  } else {
    if (!className.includes("text")) {
      className += " text-white dark:text-dark";
    }

    if (!className.includes("bg")) {
      className += " bg-dark dark:bg-light";
    }
  }
  const childArray = React.Children.toArray(children);
  const titleChild = childArray[0];
  const bottomChild = childArray[1];

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <div
      className={`relative flex w-full rounded-2xl ${
        isColumn
          ? `flex-col items-center gap-3 p-4 ${!isOpen && "h-14 overflow-hidden"}`
          : "h-16"
      } ${className}`}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex flex-row items-center justify-center gap-2 ${
          !isColumn && "absolute left-2 top-1/2 -translate-y-1/2"
        }`}
      >
        {titleChild}
        <p className="text-base font-semibold text-black">{title}</p>
      </div>

      <div className={`w-full`}>
        {isColumn && <p className="pl-5 text-start">{placeholder}</p>}
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full rounded-2xl border-2 ${!isColumn ? "h-full" : "mt-1"}`}
        />
      </div>
      <div
        className={` ${!isColumn ? "absolute right-3 top-1/2 -translate-y-1/2" : "w-full"}`}
      >
        {bottomChild}
      </div>
    </div>
  );
};

export default InputWBtnAndLabel;
