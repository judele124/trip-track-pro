import Navbar from "../components/ui/Navbar";
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
