import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToggleDarkMode } from "../components/Navbar";
import Button from "../components/ui/Button";
import EditImg from "../assets/Edit_img.png";
import wornnigImg from "../assets/wornnig-img.png";
import BottomNavigationBtn from "../components/ui/BottomNavigationBtn";
import { useEffect } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@/env.config";

const TripLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/trip") {
      navigate("/trip/map");
    }
  }, [location]);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div
        className={`page-colors relative z-0 flex h-dvh flex-col justify-between`}
      >
        <div className="flex flex-row justify-between p-2">
          <Button className="flex bg-white px-0 py-0 text-dark dark:bg-secondary dark:text-white">
            <img src={EditImg} alt="" />
          </Button>
          <div>
            <ToggleDarkMode />
            <Button className="relative rounded-[100%] bg-white text-dark dark:bg-secondary">
              <img src={wornnigImg} alt="" />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                {3}
              </span>
            </Button>
          </div>
        </div>

        <div className="absolute inset-0 bottom-16 top-[75px] -z-10 bg-secondary/20">
          <Outlet />
        </div>

        <div className="page-colors flex flex-row justify-around border-t-2 border-primary p-2">
          <BottomNavigationBtn to="participants" notificationCount={3} />
          <BottomNavigationBtn to="map" notificationCount={3} />
          <BottomNavigationBtn notificationCount={3} to="chat" />
        </div>
      </div>
    </APIProvider>
  );
};

export default TripLayout;
