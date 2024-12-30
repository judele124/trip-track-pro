import { Outlet, useNavigate } from "react-router-dom";
import {ToggleDarkMode} from '../components/Navbar'
import Button from "../components/ui/Button";
import ImageLightDark from "../components/ui/ImageLightDark";
import EditImg from '../assets/Edit_img.png'
import wornnigImg from '../assets/wornnig-img.png'
import groupImg from '../assets/GroupIcon.png'
import groupBlackImg from '../assets/GroupBlackIcon.png'
import mapImg from '../assets/mapIcon.png'
import mapBlackImg from '../assets/mapBlackIcon.png'
import chatImg from '../assets/chatIcon.png'
import chatBlackImg from '../assets/chatBlackIcon.png'


const TripLayout = () => {
    const num = 3
    const nav = useNavigate()
    return (
      <div className={`h-dvh overflow-hidden page-colors`}>
        <div className="flex flex-row justify-between p-2">
          <Button className="bg-white dark:bg-secondary flex text-dark dark:text-white" >
            <img src={EditImg} alt="" />
            <p className="mt-2">Edit trip</p>
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

        <div className="h-[80%] bg-secondary/20"><Outlet /></div>

        <div className="flex flex-row justify-around p-2 border-t-2 border-primary">
        <Button 
           onClick={() => nav("/trip/participants")}
           className="rounded-[100%] text-dark relative focus:bg-white dark:focus:bg-secondary" >
            <ImageLightDark
              srcDark={groupImg}
              srcLight={groupBlackImg}
              alt="icon of group of people"
            />
          </Button>
          <Button 
            onClick={() => nav("/trip")} 
            className="rounded-[100%] text-dark relative focus:bg-white dark:focus:bg-secondary pt-0" >
            <ImageLightDark
              srcDark={mapImg}
              srcLight={mapBlackImg}
              alt="icon of map"
            />
          </Button>
          <Button
            onClick={() => nav("/trip/chat")}  
            className="rounded-[100%] text-dark relative focus:bg-white dark:focus:bg-secondary" >
            <ImageLightDark
              srcDark={chatImg}
              srcLight={chatBlackImg}
              alt="icon of chat"
            />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary
             rounded-full text-white flex items-center justify-center" >{num}</span>
          </Button>
        </div>
      </div>
    );
  };

export default TripLayout
