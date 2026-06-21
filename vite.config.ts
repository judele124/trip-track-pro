import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiProxy = {
	target: 'http://localhost:3000',
	changeOrigin: true,
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		proxy: {
			'/auth': apiProxy,
			'/user': apiProxy,
			'/trip': apiProxy,
			'/google': apiProxy,
			'/upload': apiProxy,
			'/map': apiProxy,
			'/dev': apiProxy,
			'/health': apiProxy,
		},
	},
});
