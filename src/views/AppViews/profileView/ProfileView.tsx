import UserDetailsComponent from '@/components/UserDetailsComponent';
import { useAuthContext } from '@/contexts/AuthContext';
import Icon from '@/components/icons/Icon';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';

interface iTamplateProps {
	name: string;
	reward?: { title: string; image: string };
	status: string;
}

const data: iTamplateProps[] = [
	{
		name: 'Trip  llcvlv 1',
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 1',
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 1',
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 1',
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 1',
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 1',
		status: 'completed',
	},
	{
		name: 'Trip  llcvlv 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
	{
		name: 'Trip 1',
		status: 'completed',
	},
	{
		name: 'Trip 2',
		reward: { title: 'Reward 2', image: '' },
		status: 'completed',
	},
];

const ProfileView = () => {
	const { user } = useAuthContext();
	const { isOpen, setIsOpen } = useToggle(false);

	return (
		<div className='flex size-full max-h-[600px] flex-col gap-4'>
			{user && (
				<UserDetailsComponent
					className='border-b-2 border-primary p-2'
					name={user.name || 'Default'}
					imageUrl={user.imageUrl || 'https://robohash.org/Default.png'}
					{...(user.role !== 'guest' ? { email: user.email } : {})}
				/>
			)}
			<h2>Trips</h2>
			<div className='flex w-full flex-row justify-between rounded-lg border-2 border-dark bg-primary px-2 py-3'>
				<p className='w-[26%]'>Name</p>
				<p>Reward</p>
				<p className='w-[30%] text-left'>Status</p>
			</div>
			<div className='no-scrollbar flex h-full w-full flex-col overflow-y-auto'>
				{data?.length ? (
					data.map((trip: iTamplateProps, i: number) => (
						<div
							key={i}
							className={`flex w-full flex-row justify-between border-b-2 border-primary bg-light px-2 py-3 dark:bg-dark`}
							style={{ position: 'sticky', top: 0, zIndex: 10 + i }}
						>
							<p className='w-[45%]'>{trip.name}</p>
							<Icon name={trip.reward ? 'vIcon' : 'xIcon'} />
							<p className='w-[45%] text-center'>{trip.status}</p>
							<button
								className='m-0 cursor-help p-0'
								onClick={() => {
									setIsOpen(true);
								}}
							>
								<Icon name='threeDots' />
							</button>
						</div>
					))
				) : (
					<div className='flex h-full flex-col items-center justify-center'>
						<p>No Trips</p>
					</div>
				)}
			</div>
			<Modal
				center
				backgroundClassname='bg-transparent'
				onBackdropClick={() => setIsOpen(false)}
				open={isOpen}
			>
				<div className='flex w-48 flex-col rounded-2xl border-2 border-primary bg-light p-4'>
					<Button primary>Start trip</Button>
					<Button className='underline'>Delete</Button>
				</div>
			</Modal>
		</div>
	);
};

export default ProfileView;
