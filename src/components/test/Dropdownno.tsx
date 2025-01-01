import { useEffect, useRef, useState } from "react";
import srcIconArrow from "../../assets/select-arrow.svg";
import srcIconV from "../../assets/select-V icon.svg";

// interface IDropdownProps<T> {
//   open: boolean;
//   data: T[];
//   renderItem: (item: T, index: number) => JSX.Element;
//   backgroundColor?: "primary" | "secondary" | "dark" | "light";
//   borderColor?: "primary" | "secondary" | "dark" | "light";
// }

export interface IDropdownProps<T> {
  options: T[];
  setSelected: (option: T) => void;
  selected: T;
  disabled?: boolean;
  backgroundColor?: "primary" | "secondary" | "dark" | "light";
  borderColor?: "primary" | "secondary" | "dark" | "light";
}

export default function Dropdown<T>({
  options,
  setSelected,
  selected,
  backgroundColor = "light",
  borderColor = "dark",
}: IDropdownProps<T>) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const ref = useRef<HTMLUListElement | null>(null);

  const backgroundClassnameMap = {
    primary: "bg-primary dark:bg-secondary",
    secondary: "bg-secondary dark:bg-primary",
    dark: "bg-dark dark:bg-light",
    light: "bg-light dark:bg-dark",
  };

  const backgroundClassname = backgroundClassnameMap[backgroundColor];

  // useEffect(() => {
  //   const onClickOutside = (e: MouseEvent) => {
  //     if (!ref.current?.contains(e.target as Node)) {
  //       setIsSelectOpen(false);
  //     }
  //   };
  //   document.addEventListener("click", onClickOutside);
  //   if (!selected) {
  //     setSelected(options[0]);
  //   }
  //   return () => {
  //     document.removeEventListener("click", onClickOutside);
  //   };
  // }, []);

  const handleSelectClick = () => {
    setIsSelectOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option: T) => () => {
    setSelected(option);
    setIsSelectOpen(false);
  };

  return (
    <ul
      ref={ref}
      className={`relative flex flex-col rounded-2xl border-2 bg-white ${backgroundClassname} border-${borderColor} dark:border-light`}
    >
      <li onClick={handleSelectClick} className="rounded-2xl px-5 py-2">
        <svg
          className="mr-2 inline-block size-5"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 70.79 137.38"
        >
          <path
            fill="white"
            d="M0,134.38V3A3,3,0,0,1,5.14.9L69.92,66.59a3,3,0,0,1,0,4.21L5.14,136.48A3,3,0,0,1,0,134.38Z"
          />
        </svg>

        <span>{String(selected).toString()}</span>
      </li>
      <div className="absolute top-11 z-50 w-full rounded-2xl bg-white">
        {isSelectOpen &&
          options.map((option) => {
            return (
              <li
                className="rounded-2xl px-5 py-2"
                key={option.value}
                onClick={handleOptionClick(option)}
                value={option.value}
              >
                <svg
                  className="mr-2 inline-block size-5"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 70.79 137.38"
                ></svg>
                {option.value}
                {option.value == selected.value && (
                  <img
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    width="12"
                    src={srcIconV}
                    alt="arrow icon"
                  />
                )}
              </li>
            );
          })}
      </div>
    </ul>
  );
}
