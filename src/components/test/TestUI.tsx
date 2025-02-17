import useToggle from '@/hooks/useToggle';
import UserOrGuestModal from '../UserOrGuestModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export function TestUI() {
	const { user } = useAuthContext();
	const { isOpen, setIsOpen } = useToggle(false);

	useEffect(() => {
		setIsOpen(!user);
	}, [user]);
	return (
		<div>
			<UserOrGuestModal open={isOpen} onClose={() => setIsOpen(false)} />
		</div>
	);
}
