import { Outlet } from "react-router-dom";
import {ToggleDarkMode} from '../components/Navbar'
import Button from "../components/ui/Button";
import EditImg from '../assets/Edit_img.png'
import wornnigImg from '../assets/wornnig-img.png'
import BottomNavigationBtn from "../components/ui/BottomNavigationBtn";


const TripLayout = () => {
    const num = 3
    return (
      <div className={`relative z-0 h-dvh page-colors flex flex-col justify-between`}>
        <div className="flex flex-row justify-between p-2">
          <Button className="bg-white dark:bg-secondary flex text-dark dark:text-white px-0 py-0" >
            <img src={EditImg} alt="" />
          </Button>
          <div>
            <ToggleDarkMode />
          <Button className="bg-white dark:bg-secondary rounded-[100%] text-dark relative" >
            <img src={wornnigImg} alt="" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary
             rounded-full text-white flex items-center justify-center" >{num}</span>
          </Button>
          </div>
        </div>

        <div className="absolute top-[75px] bottom-16 inset-0 -z-10 bg-secondary/20"><Outlet /></div>

        <div className="flex flex-row justify-around p-2 border-t-2 border-primary page-colors">
          <BottomNavigationBtn to="participants" notificationCount={num} />
          <BottomNavigationBtn to="map" notificationCount={num} />
          <BottomNavigationBtn notificationCount={num} to="chat" />
        </div>
      </div>
    );
  };

export default TripLayout