import { useDarkMode } from "../contexts/DarkModeContext";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={` ${isDarkMode ? "dark" : ""}`}>
      <div className="page-colors page-padding relative h-dvh w-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

const Navbar = () => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <i>
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
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </i>
      <ToggleDarkMode />
    </div>
  );
};

const ToggleDarkMode = () => {
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
