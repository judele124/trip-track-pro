interface InputProps {
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

export default function Input({
  textarea = false,
  className = "",
  name,
  type,
  placeholder = "Default placeholder",
  onChange = () => {},
}: InputProps) {
  return textarea ? (
    <textarea
      onChange={onChange}
      className={`dark:bg-secondary w-full  resize-none border-2 border-primary ${className}`}
      name={name}
      placeholder={placeholder}
    />
  ) : (
    <input
      onChange={onChange}
      className={`dark:bg-secondary w-full border-2 border-primary ${className}`}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
}
