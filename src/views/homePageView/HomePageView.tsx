import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import imgSrcLight from "./assets/start-screen-light.svg";
import imgSrcDark from "./assets/start-screen-dark.svg";
import Button from "../../components/ui/Button";
import { useDarkMode } from "../../contexts/DarkModeContext";
const HomePageView = () => {
  const { isDarkMode } = useDarkMode();
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("notFirstEntry")) {
      nav("/first-entry");
    }
  }, []);

  return (
    <div className="page-colors page-padding flex h-full flex-col justify-around">
      <Logo />
      <img width={"100%"} src={isDarkMode ? imgSrcDark : imgSrcLight} alt="" />
      <div>
        <Button primary className="mb-1 w-full">
          Create a new trip
        </Button>
        <Button className="w-full">Join a trip</Button>
      </div>
    </div>
  );
};

export default HomePageView;
