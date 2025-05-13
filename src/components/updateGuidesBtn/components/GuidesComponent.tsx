import Icon from '@/components/icons/Icon';
import { IGuidesComponentProps } from '../UpdateGuidesBtn';

export const GuidesComponent = ({
	newParticipants,
	handleUpdateGuide,
}: IGuidesComponentProps) => {
	return (
		<div className='no-scrollbar flex max-h-[300px] w-2/5 flex-col items-center justify-center gap-2 overflow-y-auto rounded-2xl border border-dark px-2 dark:border-light'>
			{newParticipants
				.filter((p) => p.isGuide)
				.map((participant, i) => (
					<div
						onClick={() => handleUpdateGuide(participant.userModel._id, false)}
						key={`guide-${i}`}
						className='flex min-h-11 w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-white px-3 py-2 dark:bg-black'
					>
						<span className='w-full overflow-hidden text-ellipsis text-left'>
							{participant.userModel.name || 'No name'}
						</span>
						<i>
							<Icon className='text-[#D15B5B]' name='xIcon' size='20' />
						</i>
					</div>
				))}
		</div>
	);
};
