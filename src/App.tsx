import AppRoutes from "./appRoutes/AppRoutes.tsx";
import DarkModeContextProvider from "./contexts/DarkModeContext.tsx";
function App() {
  return (
    <DarkModeContextProvider>
      <AppRoutes />
    </DarkModeContextProvider>
  );
}

export default App;
