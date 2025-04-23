import React, { useEffect } from 'react';
import Icon, { IconName } from '@/components/icons/Icon';
import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import { useTripLayout } from '@/components/layouts/TripLayout/TripLayout';

interface NotificationProps {
	message: string;
	status: 'good' | 'bad' | 'warning' | 'default';
	icon?: IconName;
	isModalOpen?: boolean;
	closeModal: () => void;
}

const statusColors = {
	good: 'border-green-500 bg-green-100',
	bad: 'border-red-500 bg-red-100',
	warning: 'border-yellow-500 bg-yellow-100',
	default: 'border-primary page-colors',
};

const NotificationComponent: React.FC<NotificationProps> = ({
	message,
	status,
	icon,
	isModalOpen = false,
	closeModal,
}) => {
	const { topNavigationRef, pageContentRef } = useTripLayout();
	const { isOpen, setIsOpen } = useToggle();

	useEffect(() => {
		if (isModalOpen) {
			setTimeout(() => {
				setIsOpen(true);
				setTimeout(() => setIsOpen(false), 2500);
				setTimeout(() => closeModal(), 3200);
			}, 1000);
		}
	}, [isModalOpen]);

	return (
		<Modal
			backgroundClassname='bg-transparent'
			backdropBlur='none'
			open={isModalOpen}
			portalElementsRef={pageContentRef}
			anchorTo='top'
			anchorElement={topNavigationRef}
		>
			<div
				className={`opacity-100 transition-all duration-700 ${statusColors[status]} flex items-center gap-2 rounded-md border-2 p-4 shadow-lg ${isOpen ? 'translate-y-3 opacity-100' : 'translate-y-[-130%] opacity-0'}`}
			>
				<div className='flex items-center gap-2'>
					{icon && <Icon name={icon} size='20' />}
					<span>{message}</span>
				</div>
			</div>
		</Modal>
	);
};

export default NotificationComponent;
