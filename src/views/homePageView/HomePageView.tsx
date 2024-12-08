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
    <div className="page-colors page-padding h-dvh">
      <div className="mx-auto flex h-full max-h-screen flex-col gap-4 sm:max-w-[450px]">
        <Logo />
        <img
          className="w-full overflow-hidden object-contain object-top"
          src={isDarkMode ? imgSrcDark : imgSrcLight}
          alt="illustration of a map"
        />
        <div>
          <Button
            onClick={() => nav("/create-trip")}
            primary
            className="mb-1 w-full"
          >
            Create a new trip
          </Button>
          <Button className="w-full">Join a trip</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePageView;
