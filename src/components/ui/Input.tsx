import React from "react";

interface IInputProps {
  textarea?: boolean;
  className?: string;
  type?: string;
  name: string;
  placeholder?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  rows?: number;
}

const Input = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  IInputProps
>(function Input(
  {
    textarea = false,
    className = "",
    type = "text",
    name,
    placeholder = "Default placeholder",
    onChange = () => {},
    rows,
  }: IInputProps,
  ref: React.Ref<HTMLTextAreaElement | HTMLInputElement>,
) {
  if (textarea) {
    return (
      <textarea
        rows={rows}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        onChange={onChange}
        className={`w-full resize-none border-2 border-primary dark:bg-secondary ${className}`}
        name={name}
        placeholder={placeholder}
      />
    );
  }
  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      onChange={onChange}
      className={`dark:bg-darkSecondary w-full resize-none border-2 border-primary py-[10px] focus:border-dark focus:outline-none dark:bg-secondary dark:focus:border-light${className}`}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
});

export default React.memo(Input);
