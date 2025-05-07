import Icon from '@/components/icons/Icon';
import { INewParticipantsData } from '../UpdateGuidesBtn';
interface IGuidesComponentProps {
	newParticipants: INewParticipantsData[];
	handleRemoveGuide: (userId: string) => void;
}

export const GuidesComponent = ({
	newParticipants,
	handleRemoveGuide,
}: IGuidesComponentProps) => {
	return (
		<div className='no-scrollbar flex max-h-[300px] w-2/5 flex-col gap-2 overflow-y-auto rounded-2xl border border-dark px-1.5 py-1.5 dark:border-light'>
			{newParticipants
				?.filter((p) => p.isGuide)
				.map((participant, i) => (
					<div
						onClick={() => handleRemoveGuide(participant.userModel._id)}
						key={`guide-${i}`}
						className='flex min-h-11 cursor-pointer items-center justify-between rounded-xl bg-white px-3 py-2 dark:bg-black'
					>
						<span className='w-[90px] overflow-hidden text-ellipsis text-left'>
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
