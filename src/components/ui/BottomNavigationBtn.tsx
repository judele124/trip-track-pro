import { NavLink, NavLinkProps } from "react-router-dom";
import Icon from "../icons/Icon";

interface ILinkProps extends NavLinkProps {
  notificationCount: number | undefined;
  to: "map" | "participants" | "chat";
}
const BottomNavigationBtn = ({ notificationCount, to }: ILinkProps) => {
  const svgViewBox = {
    participants: "0 0 40 29",
    map: "0 0 50 45",
    chat: "0 0 35 28",
  };
  const svgSize = {
    participants: "30px",
    map: "30px",
    chat: "28px",
  };

  return (
    <NavLink
      to={to}
      className="relative rounded-full p-2 text-dark transition-all focus:bg-white dark:focus:bg-secondary"
    >
      <Icon
        notificationCount={notificationCount}
        size={svgSize[to]}
        viewBox={svgViewBox[to]}
        name={to}
      />
    </NavLink>
  );
};

export default BottomNavigationBtn;
