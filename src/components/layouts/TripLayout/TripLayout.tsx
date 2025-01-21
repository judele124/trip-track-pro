import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBtn from "../../ui/BottomNavigationBtn";
import TopNavigation from "./componenets/TopNavigationBar";
import { useEffect } from "react";

const TripLayout = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  const title = titleFromPath(pathname);

  useEffect(() => {
    if (location.pathname === "/trip") {
      navigate("/trip/map");
    }
  }, [pathname]);

  useEffect(() => {
    console.log("this log is from TripLayout");
  }, []);

  return (
    <div className="page-colors relative z-0 mx-auto flex h-dvh max-w-[450px] flex-col">
      {/* top navigation */}
      <TopNavigation title={title} />

      {/* main content */}
      <div className="-z-10 grow overflow-hidden bg-secondary/20">
        <Outlet />
      </div>

      {/* bottom navigation */}
      <div className="page-colors flex flex-row justify-around border-t-2 border-primary p-2">
        <BottomNavigationBtn to="participants" notificationCount={3} />
        <BottomNavigationBtn to="map" notificationCount={3} />
        <BottomNavigationBtn notificationCount={3} to="chat" />
      </div>
    </div>
  );
};

export default TripLayout;

const titleFromPath = (path: string) => {
  const arr = path.split("/");
  path = arr[arr.length - 1];
  return path.charAt(0).toUpperCase() + path.slice(1);
};
