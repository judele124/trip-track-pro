interface InputProps {
  className?: string;
  type: string;
  name: string;
  placeholder?: string;
}

export default function Input({
  name,
  type,
  className = "",
  placeholder = "Default placeholder",
}: InputProps) {
  return (
    <input
      className="w-full border-2 border-primary"
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
}
