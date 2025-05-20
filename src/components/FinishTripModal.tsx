import Modal from './ui/Modal';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '../Routes/routes';
import { useTripSocket } from '@/contexts/SocketContext';
import { useAuthContext } from '@/contexts/AuthContext';
import Button from './ui/Button';
const FinishTripModal = ({ tripId }: { tripId: string }) => {
	const { user } = useAuthContext();
	const { usersInLiveTripData } = useTripSocket();
	const nav = useNavigate();

	return (
		<Modal open={true} center onBackdropClick={() => {}}>
			<div className='page-colors flex w-[90vw] max-w-[400px] flex-col items-center justify-center gap-3 rounded-2xl p-6'>
				<h1 className='text-2xl font-semibold'>the trip is finished</h1>
				{usersInLiveTripData
					?.filter((u) => u.userId === user?._id)
					.map((user) => (
						<p>{`your score is ${user.score.reduce((a, b) => a + b, 0)}`}</p>
					))}
				<div className='mt-2 flex w-full flex-col gap-2'>
					<Button primary onClick={() => nav(navigationRoutes.app)}>
						Go Home
					</Button>
					<Button
						onClick={() => nav(`${navigationRoutes.tripDetails}/${tripId}`)}
					>
						View trip details
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default FinishTripModal;
