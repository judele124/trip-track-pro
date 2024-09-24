import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import imgSrc from "./assets/illustration.svg";
import Button from "../../components/ui/Button";
const HomePageView = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("notFirstEntry")) {
      nav("/first-entry");
    }
  }, []);

  return (
    <div className="page-colors page-padding h-full flex flex-col justify-around">
      <Logo />
      <img width={"100%"} src={imgSrc} alt="" />
      <div>
        <Button primary className="w-full mb-1">
          Create a new trip
        </Button>
        <Button className="w-full">Join a trip</Button>
      </div>
    </div>
  );
};

export default HomePageView;
