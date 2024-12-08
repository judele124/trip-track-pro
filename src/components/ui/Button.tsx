import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = {
  primary?: boolean;
  className?: string;
} & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className = "",
  children,
  primary,
  ...props
}: ButtonProps) => {
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

  return (
    <button {...props} className={`${className} px-5 py-3 font-semibold`}>
      {children}
    </button>
  );
};

export default Button;
