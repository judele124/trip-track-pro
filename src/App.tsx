import 'mapbox-gl/dist/mapbox-gl.css';
import AppRoutes from "./appRoutes";
import AuthProvider from "./contexts/AuthContext.tsx";
import DarkModeContextProvider from "./contexts/DarkModeContext.tsx";
import { axios } from "./hooks/useAxios.ts";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <DarkModeContextProvider>
        <AppRoutes />
      </DarkModeContextProvider>
    </AuthProvider>
  );
}

export default App;
