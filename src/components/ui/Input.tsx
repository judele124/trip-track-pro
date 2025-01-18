import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  KeyboardEventHandler,
} from "react";
import Icon, { IconName } from "../icons/Icon";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  textarea?: false;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: never;
  icon?: IconName;
  iconFill?: string;
}

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textarea: true;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type: never;
  icon?: never;
  iconFill?: never;
}

type InputProps = IInputProps | ITextareaProps;

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(function Input(
  {
    textarea = false,
    className = "",
    type = "text",
    name = "input",
    placeholder = "Default placeholder",
    onChange = () => {},
    onKeyDown = () => {},
    rows,
    icon,
    iconFill = "#383644",
    ...props
  }: InputProps,
  ref: React.Ref<HTMLTextAreaElement | HTMLInputElement>,
) {
  if (!className.includes("border")) {
    className += " border-primary dark:border-light";
  }

  if (textarea) {
    return (
      <textarea
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        onKeyDown={onKeyDown as KeyboardEventHandler<HTMLTextAreaElement>}
        rows={rows}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        onChange={
          onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
        }
        className={`w-full resize-none border-2 border-primary dark:bg-secondary ${className}`}
        name={name}
        placeholder={placeholder}
      />
    );
  }
  console.log(icon);

  return (
    <div className="relative h-fit">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon size="20" fill={iconFill} name={icon} />
        </span>
      )}
      <input
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
        ref={ref as React.Ref<HTMLInputElement>}
        onKeyDown={onKeyDown as KeyboardEventHandler<HTMLInputElement>}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        className={`w-full resize-none border-2 border-primary focus:border-dark focus:outline-none dark:bg-secondary dark:focus:border-light ${className} ${icon ? "pl-9" : ""}`}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
});

export default React.memo(Input);
