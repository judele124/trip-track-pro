import { Outlet, useLocation } from "react-router-dom";
import BottomNavigationBtn from "../../ui/BottomNavigationBtn";
import TopNavigation from "./componenets/TopNavigationBar";

const TripLayout = () => {
  let { pathname } = useLocation();
  const title = titleFromPath(pathname);

  const num = 3;
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
        <BottomNavigationBtn to="participants" notificationCount={num} />
        <BottomNavigationBtn to="map" notificationCount={num} />
        <BottomNavigationBtn notificationCount={num} to="chat" />
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
