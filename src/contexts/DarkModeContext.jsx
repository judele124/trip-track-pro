import { createContext } from "react";

const darkModeContext = createContext();

const DarkModeContext = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <darkModeContext.Provider value={{ darkMode, handleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
};

export default DarkModeContext;

export const useDarkMode = () => {
  return useContext(darkModeContext);
};
