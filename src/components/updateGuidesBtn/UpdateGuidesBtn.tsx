import Modal from '../ui/Modal';
import useToggle from '@/hooks/useToggle';
import { useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import { Types } from 'trip-track-package';
import Icon from '../icons/Icon';
import Button from '../ui/Button';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import { ParticipantsComponent } from './components/ParticipantsComponent';
import { GuidesComponent } from './components/GuidesComponent';
import { getErrorMessage } from '@/utils/errorMessages';

interface IUpdateGuidesBtnProps {
	trip: Trip;
	onClose?: () => void;
}

export interface INewParticipantsData {
	userModel: Types['User']['Model'];
	isGuide: boolean;
}

export interface IGuidesComponentProps {
	newParticipants: INewParticipantsData[];
	handleUpdateGuide: (userId: string, isGuide: boolean) => void;
}
const UpdateGuidesBtn = ({ onClose, trip }: IUpdateGuidesBtnProps) => {
	const { activate, error, loading, status } = useAxios({ manual: true });
	const { isOpen, toggle } = useToggle();
	const [newParticipants, setNewParticipants] = useState<
		INewParticipantsData[]
	>([]);

	useEffect(() => {
		setNewParticipants(() =>
			trip.participants.map((participant) => ({
				userModel: participant.userId,
				isGuide: trip.guides.some((g) => g._id === participant.userId._id),
			}))
		);
	}, [trip]);

	const handleUpdateGuide = (userId: string, isGuide: boolean) => {
		setNewParticipants((prev) =>
			prev.map((p) => (p.userModel._id === userId ? { ...p, isGuide } : p))
		);
	};

	const handleClose = () => {
		onClose?.();
		toggle();
	};

	const handleSubmit = async () => {
		const { error } = await activate({
			url: `${API_BASE_URL}/trip/update-guides/${trip._id}`,
			method: 'PUT',
			data: {
				guideIds: newParticipants
					.filter((p) => p.isGuide)
					.map((p) => p.userModel._id),
			},
		});
		if (!error) {
			handleClose();
		}
	};

	return (
		<>
			<button
				onClick={toggle}
				className='rounded-xl border-2 border-dark bg-primary px-3 py-1 text-center text-sm capitalize text-dark'
			>
				add guides
			</button>
			<Modal open={isOpen} onBackdropClick={handleClose} center>
				<div className='page-colors w-[90vw] max-w-[400px] rounded-3xl px-5 pb-4'>
					<div className='flex items-center justify-between'>
						<p className='text-xl font-semibold'>Choose your guides</p>
						<Button onClick={handleClose} className='my-3 -mr-2.5 px-3'>
							<Icon name='xIcon' className='fill-white' />
						</Button>
					</div>
					{!newParticipants.length ? (
						<p className='text-center text-lg'>No participants found</p>
					) : (
						<>
							<div className='flex justify-between gap-4'>
								{/* LEFT COLUMN */}
								<ParticipantsComponent
									newParticipants={newParticipants}
									handleUpdateGuide={handleUpdateGuide}
								/>
								{/* RIGHT COLUMN */}
								<GuidesComponent
									newParticipants={newParticipants}
									handleUpdateGuide={handleUpdateGuide}
								/>
							</div>

							<Button onClick={handleSubmit} primary className='mt-4 w-full'>
								{error && status
									? getErrorMessage(status)
									: loading
										? 'loading'
										: 'submit'}
							</Button>
						</>
					)}
				</div>
			</Modal>
		</>
	);
};

export default UpdateGuidesBtn;
