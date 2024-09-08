const Button = ({ children, isPrimary, className, ...props }) => {
  if (!className) {
    className = `${isPrimary ? "bg-orange" : "bg-purple text-white"}`;
  }

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
