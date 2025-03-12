import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';

interface IRewardDetailsProps {
	reward: Trip['reward'];
}

export default function RewardDetails({ reward }: IRewardDetailsProps) {
	const { isOpen, toggle } = useToggle();
	if (!reward) return null;

	return (
		<>
			<button
				onClick={toggle}
				className='rounded-xl border-2 border-dark bg-[#ffb900] px-2 py-1 text-center text-sm text-dark'
			>
				{reward?.title} 🏆
			</button>
			<Modal open={isOpen} onBackdropClick={toggle} center>
				<div className='page-colors w-[90vw] max-w-[400px] rounded-2xl p-5 text-center'>
					<h3>
						{!reward.image ? 'No reward image was uploaded' : reward.title}
					</h3>
					{reward.image && (
						<img className='mt-2 rounded-lg' src={reward.image} alt='' />
					)}
				</div>
			</Modal>
		</>
	);
}
