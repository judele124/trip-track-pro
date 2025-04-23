import { useState, useEffect } from 'react';

export default function useScreenWidth(): number {
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return screenWidth;
}
