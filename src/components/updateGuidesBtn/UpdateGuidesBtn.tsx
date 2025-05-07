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

interface IUpdateGuidesBtnProps {
	trip?: Trip;
	onClose: () => void;
}

export interface INewParticipantsData {
	userModel: Types['User']['Model'];
	isGuide: boolean;
}
const UpdateGuidesBtn = ({ onClose, trip }: IUpdateGuidesBtnProps) => {
	const { activate, error } = useAxios({ manual: true });
	const { isOpen, toggle } = useToggle();
	const [newParticipants, setNewParticipants] =
		useState<INewParticipantsData[]>();

	useEffect(() => {
		if (!isOpen || !trip || !trip.participants) return;

		setNewParticipants(() =>
			trip.participants.map((participant) => ({
				userModel: participant.userId,
				isGuide: trip.guides.some((g) => g._id === participant.userId._id),
			}))
		);
	}, [trip, isOpen]);

	const handleAddGuide = (i: number) => {
		if (!trip || !trip.participants) return;
		setNewParticipants((prev) => {
			if (!prev) return;
			prev[i].isGuide = true;
			return [...prev];
		});
	};

	const handleRemoveGuide = (userId: string) => {
		setNewParticipants((prev) => {
			if (!prev) return;
			const index = prev.findIndex((p) => p.userModel._id === userId);
			if (index === -1) return [...prev];
			prev[index].isGuide = false;
			return [...prev];
		});
	};

	const handleClose = () => {
		setNewParticipants(undefined);
		onClose();
		toggle();
	};

	const handleSubmit = async () => {
		if (!trip || !newParticipants) return;
		await activate({
			url: `${API_BASE_URL}/trip/update-guides/${trip._id}`,
			method: 'PUT',
			data: {
				guideIds: newParticipants
					.filter((p) => p.isGuide)
					.map((p) => p.userModel._id),
			},
		});
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
					{newParticipants && newParticipants?.length > 0 ? (
						<>
							<div className='flex justify-between gap-4'>
								{/* LEFT COLUMN */}
								<ParticipantsComponent
									newParticipants={newParticipants}
									handleAddGuide={handleAddGuide}
								/>
								{/* RIGHT COLUMN */}
								<GuidesComponent
									newParticipants={newParticipants}
									handleRemoveGuide={handleRemoveGuide}
								/>
							</div>

							<Button onClick={handleSubmit} primary className='mt-4 w-full'>
								{error ? 'bed req' : 'submit'}
							</Button>
						</>
					) : (
						<p className='text-center text-lg'>No participants found</p>
					)}
				</div>
			</Modal>
		</>
	);
};

export default UpdateGuidesBtn;
