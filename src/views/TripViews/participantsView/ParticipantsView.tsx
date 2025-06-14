import { useTripSocket } from '@/contexts/socketContext/SocketContext';
import { useTripContext } from '@/contexts/TripContext';

const ParticipantsView = () => {
	const { usersInLiveTripExpData } = useTripSocket();
	const { trip } = useTripContext();

	const guides = [];
	const participants = [];

	for (const row of usersInLiveTripExpData) {
		if (
			trip?.guides.some((guide) => guide._id === row.userId) ||
			trip?.creator._id === row.userId
		) {
			guides.push(row);
		} else {
			participants.push(row);
		}
	}

	return (
		<div className='flex h-full w-full flex-col gap-7 overflow-y-auto text-gray-800 dark:text-light'>
			{guides.length > 0 && (
				<div className='w-full pt-6'>
					<h3 className='px-2 py-1 text-left text-sm font-bold'>Guides:</h3>
					<div className='flex flex-col items-center'>
						{guides.map((user, index) => (
							<UserDetails
								key={user.userId}
								name={user.name}
								imageUrl={user.imageUrl}
								className={`flex w-[95%] items-center gap-3 p-2 ${
									index < guides.length - 1 ? 'border-b border-primary/30' : ''
								}`}
							/>
						))}
					</div>
				</div>
			)}

			{participants.length > 0 && (
				<div className='w-full'>
					<h3 className='px-2 py-1 text-left text-sm font-bold'>
						Participants:
					</h3>
					<div className='flex flex-col items-center'>
						{participants.map((user, index) => (
							<UserDetails
								key={user.userId}
								name={user.name}
								imageUrl={user.imageUrl}
								className={`flex w-[95%] items-center gap-3 p-2 ${
									index < participants.length - 1
										? 'border-b border-primary/30'
										: ''
								}`}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ParticipantsView;

const UserDetails = ({
	name,
	imageUrl,
	className = '',
}: {
	name: string;
	imageUrl: string;
	className?: string;
}) => (
	<div className={className}>
		<img
			src={imageUrl}
			alt=''
			className='size-10 shrink-0 rounded-full border border-primary bg-light'
		/>
		<span className='truncate pl-2 text-sm font-medium'>{name}</span>
	</div>
);
