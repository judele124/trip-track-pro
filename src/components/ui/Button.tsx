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
    className += " bg-primary text-dark";
  } else {
    if (!className.includes("text")) {
      className += " text-white dark:text-dark";
    }

    if (!className.includes("bg")) {
      className += " bg-dark dark:bg-light";
    }
  }

  return (
    <button
      {...props}
      className={`${className} font-semibold rounded-2xl px-5 py-3`}
    >
      {children}
    </button>
  );
};

export default Button;
