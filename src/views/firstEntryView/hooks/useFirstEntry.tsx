import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFirstEntry = (dataLength: number) => {
  const nav = useNavigate();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index + 1 === dataLength) {
      endFirstEntry();
    } else {
      setIndex((index + 1) % dataLength);
    }
  };

  const endFirstEntry = () => {
    localStorage.setItem("notFirstEntry", "true");
    nav("/");
  };
  return { index, handleNext, endFirstEntry };
};

export default useFirstEntry;
