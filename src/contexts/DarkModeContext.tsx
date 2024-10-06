import { createContext, useContext, useState } from "react";

interface IDarkModeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface IDarkModeContextProviderProps {
  children?: React.ReactNode;
}

const darkModeContext = createContext<IDarkModeContext>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const DarkModeContextProvider = ({
  children,
}: IDarkModeContextProviderProps) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <darkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(darkModeContext);
};

export default DarkModeContextProvider;
