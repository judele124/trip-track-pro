import 'mapbox-gl/dist/mapbox-gl.css';
import AuthProvider from './contexts/AuthContext.tsx';
import DarkModeContextProvider from './contexts/DarkModeContext.tsx';
import { axios } from './hooks/useAxios.ts';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './Routes/index.tsx';
import { TestUI } from './components/test/TestUI.tsx';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<DarkModeContextProvider>
					<TestUI />
					<AllRoutes />
				</DarkModeContextProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
