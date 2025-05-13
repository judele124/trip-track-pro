import Icon from '@/components/icons/Icon';
import { IGuidesComponentProps } from '../UpdateGuidesBtn';

export const ParticipantsComponent = ({
	newParticipants,
	handleUpdateGuide,
}: IGuidesComponentProps) => {
	return (
		<div className='no-scrollbar flex max-h-[300px] w-3/5 flex-col overflow-y-auto rounded-2xl border border-dark bg-white p-2 dark:border-light dark:bg-black'>
			{newParticipants?.map((participant, i) => (
				<div
					key={i}
					onClick={() => handleUpdateGuide(participant.userModel._id, true)}
					className='flex min-h-12 cursor-pointer items-center justify-between border-b border-dark last:border-none dark:border-light'
				>
					<div className='flex items-center gap-2'>
						{participant.userModel.imageUrl && (
							<img
								src={participant.userModel.imageUrl}
								alt='user avatar'
								className='m-1 h-6 w-6 rounded-full border-2 border-primary'
							/>
						)}
						<span className='w-[90px] overflow-hidden text-ellipsis text-left'>
							{participant.userModel.name}
						</span>
					</div>
					{participant.isGuide && (
						<i>
							<Icon name='vIcon' size='20' className='fill-green-700' />
						</i>
					)}
				</div>
			))}
		</div>
	);
};
