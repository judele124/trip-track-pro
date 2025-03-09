import UserDetailsComponent from '@/components/UserDetailsComponent';
import { useAuthContext } from '@/contexts/AuthContext';
import Icon from '@/components/icons/Icon';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { ExperienceType } from 'trip-track-package';
import TripRow from './components/TripRow';

const data: Trip[] = [
	{
		_id: '67af347857b476b376e24b01',
		creator: '67af2c5957b476b376e24aff',
		guides: [],
		name: 'full trip',
		description: 'this ig goint to be an amazing adventure',
		stops: [
			{
				location: {
					lon: 34.8172811,
					lat: 31.8857785,
				},
				address: 'יעקב מדהלה, Rehovot, Israel',
				experience: {
					type: ExperienceType.TRIVIA,
					data: {
						question: 'שאלה מסוימת',
						answer: 'תשובה 2',
						options: ['אופציה 1', 'אופציה 2'],
					},
					score: 100,
				},
			},
			{
				location: {
					lon: 34.774915,
					lat: 31.990604,
				},
				address: 'קניון הזהב, David Saharov Street, Rishon LeTsiyon, Israel',
			},
		],
		reward: {
			image:
				'https://triptrack-bucket.s3.eu-north-1.amazonaws.com/1739535479070-782907874-%C3%A2%C2%80%C2%8F%C3%A2%C2%80%C2%8F%C3%97%C2%9C%C3%97%C2%9B%C3%97%C2%99%C3%97%C2%93%C3%97%C2%94.PNG',
			title: 'sick reword',
		},
		status: 'created',
	},
	{
		_id: '67b0e4771b50cc00a5252ce0',
		creator: '67a5e0be99d2fcaf8d59c488',
		guides: [],
		name: 'test mongo id',
		stops: [
			{
				location: {
					lon: 10,
					lat: 10,
				},
			},
			{
				location: {
					lon: 15,
					lat: 8,
				},
			},
		],
		status: 'completed',
	},
	{
		_id: '67b24a3cca7ddb57bc55b129',
		creator: '67b249f8ca7ddb57bc55b126',
		guides: [],
		name: 'trip 323',
		description: 'ddddddddddd',
		stops: [
			{
				location: {
					lon: 34.8153893,
					lat: 31.8855383,
				},
				address: 'יעקב מדהלה 1, Rehovot, Israel',
			},
			{
				location: {
					lon: 34.8025448,
					lat: 31.9662577,
				},
				address:
					'תחנה מרכזית הישנה בראשון לציון, Herzl Street, Rishon LeTsiyon, Israel',
			},
		],
		status: 'cancelled',
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
			<div className='no-scrollbar flex h-full w-full flex-col overflow-y-auto'>
				{data?.length ? (
					data.map((trip: Trip, i: number) => (
						<TripRow key={i} trip={trip} setIsOpen={setIsOpen} i={i} />
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
