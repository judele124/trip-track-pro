import { Outlet } from "react-router-dom";
import { ToggleDarkMode } from "../components/Navbar";
import Button from "../components/ui/Button";
import EditImg from "../assets/Edit_img.png";
import wornnigImg from "../assets/wornnig-img.png";
import BottomNavigationBtn from "../components/ui/BottomNavigationBtn";
import { useTripSocket } from "../contexts/SocketContext";

const TripLayout = () => {
  const { tripSocket } = useTripSocket();

  const num = 3;
  return (
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
              {num}
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bottom-16 top-[75px] -z-10 bg-secondary/20">
        <Outlet />
      </div>

      <div className="page-colors flex flex-row justify-around border-t-2 border-primary p-2">
        <BottomNavigationBtn to="participants" notificationCount={num} />
        <BottomNavigationBtn to="map" notificationCount={num} />
        <BottomNavigationBtn notificationCount={num} to="chat" />
      </div>
    </div>
  );
};

export default TripLayout;
