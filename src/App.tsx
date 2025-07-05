import 'mapbox-gl/dist/mapbox-gl.css';
import AuthProvider from './contexts/AuthContext.tsx';
import DarkModeContextProvider from './contexts/DarkModeContext.tsx';
import { axios } from './hooks/useAxios.ts';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './Routes/index.tsx';
import { API_BASE_URL } from './env.config.ts';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<DarkModeContextProvider>
					<AllRoutes />
				</DarkModeContextProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
