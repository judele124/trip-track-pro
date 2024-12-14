import React, { InputHTMLAttributes } from "react";
import Input from "./Input";

interface InputWLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  textarea?: boolean;
  type?: string;
  name: string;
  placeholder?: string;
  labelClassName?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default React.forwardRef<HTMLInputElement, InputWLabelProps>(
  function InputWLabel(
    {
      name,
      type = "text",
      title = "Default Title",
      labelClassName = "",
      placeholder,
      textarea = false,
      onChange = () => {},
      ...props
    }: InputWLabelProps,
    ref,
  ) {
    return (
      <label className={`flex w-full flex-col gap-1 ${labelClassName}`}>
        <span className="pl-5 text-start font-semibold">{title}</span>
        <Input
          {...props}
          ref={ref}
          textarea={textarea}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </label>
    );
  },
);
