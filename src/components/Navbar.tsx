import { useDarkMode } from "../contexts/DarkModeContext";

export default function Navbar() {
  return (
    <div className="mb-3 flex items-center justify-between">
      <BackButton />
      <ToggleDarkMode />
    </div>
  );
}

const BackButton = () => {
  return (
    <i onClick={() => history.back()}>
      <svg
        className="stroke-dark dark:stroke-light"
        width="40"
        height="23"
        viewBox="0 0 40 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2L2 11.25L13 21M38 11H2"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
};

export const ToggleDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className="size-7 rounded-full bg-dark p-0 text-light dark:bg-light"
      onClick={() => {
        toggleDarkMode();
      }}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};
