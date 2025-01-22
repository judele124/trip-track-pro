import React, { InputHTMLAttributes, forwardRef, Ref } from "react";
import Icon, { IconName } from "../icons/Icon";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  icon?: IconName;
  iconFill?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
  {
    icon,
    iconFill = "#383644",
    className = "",
    containerClassName,
    ...props
  }: IInputProps,
  ref: Ref<HTMLInputElement>,
) {
  if (!className.includes("border")) {
    className += " border-primary dark:border-light";
  }

  return (
    <div className={`relative h-fit ${containerClassName}`}>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon size="20" fill={iconFill} name={icon} />
        </span>
      )}
      <input
        className={`w-full resize-none border-2 border-primary focus:border-dark focus:outline-none dark:bg-secondary dark:focus:border-light ${className} ${icon ? "pl-9" : ""}`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default React.memo(Input);
