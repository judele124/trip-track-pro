import AppRoutes from "./appRoutes";
import TestUI from "./components/test/TestUI.tsx";
import DarkModeContextProvider from "./contexts/DarkModeContext.tsx";
import { axios } from "./hooks/useAxios.ts";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <DarkModeContextProvider>
      {/* <AppRoutes /> */}
      <TestUI />
    </DarkModeContextProvider>
  );
}

export default App;
