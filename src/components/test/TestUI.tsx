import useToggle from '@/hooks/useToggle';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export function TestUI() {
	const { user } = useAuthContext();
	const { isOpen, setIsOpen } = useToggle(false);

	useEffect(() => {
		setIsOpen(!user);
	}, [user]);
	return <div></div>;
}
