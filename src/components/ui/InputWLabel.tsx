import Input from "./Input";

interface InputWLabelProps {
  title?: string;
  className?: string;
  type: string;
  name: string;
  placeholder?: string;
}

export default function InputWLabel({
  name,
  type,
  title = "Default Title",
  placeholder,
  className = "",
}: InputWLabelProps) {
  return (
    <label className={`flex w-full flex-col ${className}`}>
      <span className="pl-5">{title}</span>
      <Input name={name} type={type} placeholder={placeholder} />
    </label>
  );
}
