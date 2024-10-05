import { useDarkMode } from "../contexts/DarkModeContext";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`relative h-dvh w-screen ${isDarkMode ? "dark" : ""}`}>
      <Outlet />
      <ToggleDarkMode />
    </div>
  );
};

export default Layout;
const ToggleDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className="fixed right-3 top-3 size-10 rounded-full bg-dark p-0 text-light dark:bg-light"
      onClick={() => {
        toggleDarkMode();
      }}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};
