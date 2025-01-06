import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import imgSrcLight from "./assets/start-screen-light.svg";
import imgSrcDark from "./assets/start-screen-dark.svg";
import Button from "../../components/ui/Button";
import ImageLightDark from "../../components/ui/ImageLightDark";
import { useAuthContext } from "../../contexts/AuthContext";

const HomePageView = () => {
  const { user } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("notFirstEntry")) {
      nav("/first-entry");
    } else if (!user && !localStorage.getItem("sentToLogin")) {
      localStorage.setItem("sentToLogin", "true");
      nav("/login");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Logo />
        <ImageLightDark
          srcDark={imgSrcDark}
          srcLight={imgSrcLight}
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
    </>
  );
};

export default HomePageView;
