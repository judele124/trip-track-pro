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

  if (textarea) {
    return (
      <textarea
        onChange={onChange}
        className={`w-full resize-none border-2 border-primary py-[10px] focus:border-dark focus:outline-none dark:bg-darkSecondary dark:focus:border-light ${className}`}
        name={name}
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      onChange={onChange}
      className={`w-full resize-none border-2 border-primary py-[10px] focus:border-dark focus:outline-none dark:bg-darkSecondary dark:focus:border-light ${className}`}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
}
