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
  }

  if (!className.includes("text")) {
    className += " text-white dark:text-dark";
  }

  if (!className.includes("bg")) {
    className += " bg-dark dark:bg-light";
  }

  if (!className.includes("px-") || !className.includes("py-")) {
    className += " px-5 py-3";
  }

  console.log(className);

  return (
    <button {...props} className={`${className} font-semibold`}>
      {children}
    </button>
  );
};

export default Button;
