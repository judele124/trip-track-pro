import { useDarkMode } from "../contexts/DarkModeContext";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="page-colors page-padding relative h-dvh overflow-hidden">
        <div className="mx-auto h-full sm:max-w-[450px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
