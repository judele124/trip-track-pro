import Input from "./Input";

interface InputWLabelProps {
  title?: string;
  textarea?: boolean;
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default function InputWLabel({
  name,
  type,
  title = "Default Title",
  placeholder,
  textarea = false,
  onChange = () => {},
}: InputWLabelProps) {
  return (
    <label className={`flex w-full flex-col`}>
      <span className="pl-5 font-semibold">{title}</span>
      <Input
        textarea={textarea}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}
