import Modal from '@/components/ui/Modal';
import { useAuthContext } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

interface IUserProfileModalProps {
	open: boolean;
	onClose: () => void;
}

export default function UserProfileModal({
	open,
	onClose,
}: IUserProfileModalProps) {
	const { user } = useAuthContext();

	return (
		<Modal center onBackdropClick={onClose} open={open}>
			<div className='flex w-[95vw] max-w-[400px] flex-col gap-6 rounded-2xl bg-light p-8 text-dark dark:bg-dark dark:text-light'>
				<div className='flex items-center gap-4'>
					<img
						src={user?.imageUrl || ''}
						alt='Profile'
						className='h-16 w-16 rounded-full'
					/>
					<div>
						<h3 className='text-xl font-bold'>{user?.name}</h3>
						<p className='text-sm opacity-75'>{user?.email}</p>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<h4 className='font-medium'>Trip related information</h4>
				</div>

				<Button onClick={onClose} className='w-full'>
					Close
				</Button>
			</div>
		</Modal>
	);
}
