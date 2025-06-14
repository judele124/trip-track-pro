import { useTripSocket } from '@/contexts/socketContext/SocketContext';

const ParticipantsView = () => {
	const { usersInLiveTripExpData } = useTripSocket();

	return (
		<div className='page-colors relative z-30 flex h-full flex-col items-center text-gray-800 dark:text-light'>
			<div className='mt-3 flex h-[60px] w-[90vw] max-w-[380px] flex-row items-center gap-3 rounded-2xl border-2 border-dark bg-primary p-2 font-semibold shadow-md shadow-black/55 dark:border-light'>
				<span className='w-[48%] pl-1'>name</span>
				<div className='flex w-1/2 items-center justify-between gap-4'>
					<div className='w-2/5 text-center'>distance</div>
					<div className='w-2/5 text-center'>score</div>
				</div>
			</div>
			<div
				style={{ scrollbarWidth: 'none' }}
				className='flex w-full flex-col items-center overflow-y-auto text-sm'
			>
				{usersInLiveTripExpData.map((row, index) => (
					<div
						key={`${index}-ledrboard-row`}
						className={`flex w-[88vw] max-w-[376px] flex-row items-center gap-3 ${index < usersInLiveTripExpData.length - 1 ? 'border-b-2 border-primary' : ''} p-2`}
					>
						<span className='w-1/2 pl-1 text-sm font-semibold'>{row.name}</span>

						<div className='flex h-[35px] w-1/2 items-center justify-between gap-4 text-sm'>
							<div className='w-2/5 text-center'>{45 + 'km'}</div>
							<div className='w-2/5 text-center'>
								{row.score.reduce((a, b) => a + b, 0)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ParticipantsView;
