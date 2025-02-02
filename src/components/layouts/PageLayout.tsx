import { navgationRoutes } from "@/Routes/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PageLayout = () => {
  const nav = useNavigate();

  useEffect(() => {
    const isFirstEntry = localStorage.getItem("notFirstEntry") !== "true";
    if (isFirstEntry) {
      nav(navgationRoutes.firstEntry);
    }
  }, []);
  return (
    <div className="page-colors page-padding relative h-dvh overflow-hidden">
      <div className="relative mx-auto size-full sm:max-w-[400px]">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
