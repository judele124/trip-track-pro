import { useState, useEffect } from 'react';

export const useDebouncedValue = (
	inputValue: string,
	delay: number
): string => {
	const [debouncedValue, setDebouncedValue] = useState(inputValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(inputValue);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [inputValue, delay]);

	return debouncedValue;
};
