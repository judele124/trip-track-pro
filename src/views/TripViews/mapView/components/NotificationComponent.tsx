import React, { useEffect, useState } from 'react';
import Icon, { IconName } from '@/components/icons/Icon';
import Modal from '@/components/ui/Modal';
import { set } from 'react-hook-form';
interface NotificationProps {
	message: string;
	status: 'good' | 'bad' | 'warning' | 'default';
	icon?: IconName;
	isOpen: boolean;
	onClose: () => void;
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
	isOpen,
	onClose,
}) => {
	const [visible, setVisible] = useState(false);
	const topNavigationBar = document.getElementById('trip-top-navigation');

	useEffect(() => {
		if (isOpen) {
			const time = 3000;
			setVisible(true);
			setTimeout(() => {
				setVisible(false);
			}, time - 700);
			setTimeout(() => {
				onClose();
			}, time);
		}
	}, [isOpen]);

	const handleClose = () => {
		setVisible(false);
		setTimeout(() => {
			onClose();
		}, 700);
	};

	return (
		<Modal
			backgroundClassname='bg-transparent backdrop-blur-none'
			open={isOpen}
			onBackdropClick={handleClose}
			anchorElement={{ current: null }}
			anchorTo='bottom-right'
		>
			<div
				className={`fixed left-1/2 top-0 w-[90%] max-w-[calc(400px-1.3rem)] -translate-x-1/2 transform opacity-100 transition-all duration-700 ${
					visible ? 'translate-y-24 opacity-100' : '-translate-y-full opacity-0'
				} ${statusColors[status]} flex items-center gap-2 rounded-md border-2 p-4 shadow-lg`}
			>
				<div className='flex items-center gap-2'>
					{icon && <Icon className='' name={icon} size='20' />}
					<span>{message}</span>
				</div>
			</div>
		</Modal>
	);
};

export default NotificationComponent;
