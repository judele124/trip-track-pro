import React from "react";

interface IInputProps {
  textarea?: boolean;
  className?: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default React.forwardRef<HTMLInputElement , IInputProps>(function Input(
  {
    textarea = false,
    className = "",
    name,
    type,
    placeholder = "Default placeholder",
    onChange = () => {},
  }: IInputProps,
  ref,
) {
  if (textarea)
    return (
      <textarea
        onChange={onChange}
        className={`dark:bg-secondary w-full resize-none border-2 border-primary ${className}`}
        name={name}
        placeholder={placeholder}
      />
    );
  return (
    <input
      ref={ref}
      onChange={onChange}
      className={`dark:bg-secondary w-full border-2 border-primary ${className}`}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
});
