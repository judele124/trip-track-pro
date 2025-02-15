import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { navigationRoutes } from '@/Routes/routes';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import Icon from '../icons/Icon';

interface UserOrGuestModalProps {}

export default function UserOrGuestModal({}: UserOrGuestModalProps) {
	const { activate, loading, data, status, error } = useAxios({
		manual: true,
	});
	const nav = useNavigate();
	return (
		<Modal open center onBackdropClick={() => {}}>
			<div className='page-colors flex flex-col gap-4 rounded-2xl p-8 text-center'>
				<div>
					<h3>You are not logged in</h3>
					<p>Sign in to continue</p>
				</div>
				<Button
					className={status ? 'bg-green-500' : ''}
					onClick={async () => {
						try {
							await activate({
								url: `${API_BASE_URL}/auth/create-guest-token`,
								method: 'GET',
							});
						} catch (error) {
							console.error(error);
						}
					}}
				>
					{(error && (
						<p className='text-red-500'>
							{error?.message || 'There was an error'}
						</p>
					)) ||
						(loading && <Icon name='spinner' />) ||
						(status && 'Token created') ||
						'Create guest token'}
				</Button>
				<Button
					primary
					onClick={() => {
						nav(navigationRoutes.login);
					}}
				>
					Login as user
				</Button>
			</div>
		</Modal>
	);
}
