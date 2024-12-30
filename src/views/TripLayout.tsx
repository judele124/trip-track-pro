import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {ToggleDarkMode} from '../components/Navbar'
import Button from "../components/ui/Button";
import ImageLightDark from "../components/ui/ImageLightDark";
import EditImg from '../assets/Edit_img.png'
import wornnigImg from '../assets/wornnig-img.png'



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
          <LinkWIthIcon title="participants" alt="icon of group of people" to="participants"/>
          <LinkWIthIcon title="map" alt="icon of map" to=""/>
          <LinkWIthIcon title="chat" alt="icon of chat" ItHasAlerts={true} to="chat" />
        </div>
      </div>
    );
  };

export default TripLayout



import groupImg from '../assets/GroupIcon.png'
import groupBlackImg from '../assets/GroupBlackIcon.png'
import mapImg from '../assets/mapIcon.png'
import mapBlackImg from '../assets/mapBlackIcon.png'
import chatImg from '../assets/chatIcon.png'
import chatBlackImg from '../assets/chatBlackIcon.png'

interface ILinkProps {
  title: 'map' | 'participants' | 'chat'
  alt: string
  ItHasAlerts?: boolean
  to:string
}
const LinkWIthIcon = ({ title , alt , ItHasAlerts = false , to }: ILinkProps) => {
   
  const details = {
     title,
     srcDark: title === "map" ? mapImg : title === "participants" ? groupImg : chatImg,
     srcLight: title === "map" ? mapBlackImg : title === "participants" ? groupBlackImg : chatBlackImg,
     alt,
   }

   return (
  
      <NavLink 
        to={to}
        className="rounded-full text-dark relative size-12 focus:bg-white dark:focus:bg-secondary p-2" 
      >
        <ImageLightDark {...details} />
        {ItHasAlerts && <span className="absolute top-0 right-0 w-4 h-4 bg-primary
             rounded-full text-white flex items-center justify-center" >3</span>}
      </NavLink>
   )
}