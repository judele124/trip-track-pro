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
	duration?: number;
}

const statusColors = {
	good: 'border-green-500 bg-green-100',
	bad: 'border-red-500 bg-red-100',
	warning: 'border-yellow-500 bg-yellow-100',
	default: 'border-primary page-colors',
};

const Notification: React.FC<NotificationProps> = ({
	message,
	status,
	icon,
	isModalOpen = false,
	closeModal,
	duration = 3000,
}) => {
	const { topNavigationRef, pageContentRef } = useTripLayout();
	const { isOpen, setIsOpen } = useToggle();

	useEffect(() => {
		if (isModalOpen) {
			setTimeout(() => {
				setIsOpen(true);
				setTimeout(() => setIsOpen(false), duration);
				setTimeout(() => closeModal(), duration + 500);
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
				className={`min-w-48 opacity-100 transition-all duration-700 ${statusColors[status]} flex items-center justify-center gap-2 rounded-md border-2 p-4 shadow-lg ${isOpen ? 'translate-y-3 opacity-100' : 'translate-y-[-130%] opacity-0'}`}
			>
				<i>{icon && <Icon name={icon} size='20' />}</i>
				<span>{message}</span>
			</div>
		</Modal>
	);
};

export default Notification;
