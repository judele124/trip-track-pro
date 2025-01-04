import { NavLink, NavLinkProps } from 'react-router-dom'
import groupImg from '../../assets/GroupIcon.png'
import groupBlackImg from '../../assets/GroupBlackIcon.png'
import mapImg from '../../assets/mapIcon.png'
import mapBlackImg from '../../assets/mapBlackIcon.png'
import chatImg from '../../assets/chatIcon.png'
import chatBlackImg from '../../assets/chatBlackIcon.png'
import ImageLightDark from './ImageLightDark'

const images = {
  map:{ srcLight:mapBlackImg,srcDark:mapImg, alt:" icon of map" },
  participants: { srcLight:groupBlackImg,srcDark:groupImg , alt:"icon of group of people"},
  chat: { srcLight:chatBlackImg,srcDark:chatImg , alt:"icon of chat" }
}

interface ILinkProps extends NavLinkProps {
  notificationCount: number | undefined
  to: 'map' | 'participants' | 'chat'
}
const BottomNavigationBtn = ({notificationCount = 0 , to }: ILinkProps) => {
   
   return (
  
      <NavLink 
        to={to}
        className="rounded-full text-dark relative size-12 focus:bg-white dark:focus:bg-secondary p-2" 
      >
        <ImageLightDark {...images[to]} />
        {notificationCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-primary
             rounded-full text-white flex items-center justify-center" >{notificationCount}</span>}
      </NavLink>
   )
}

export default BottomNavigationBtn