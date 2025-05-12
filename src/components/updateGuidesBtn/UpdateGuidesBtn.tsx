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
	const { activate, error, loading } = useAxios({ manual: true });
	const { isOpen, toggle } = useToggle();
	const [newParticipants, setNewParticipants] = useState<
		INewParticipantsData[]
	>([]);

	useEffect(() => {
		if (!trip) return;
		setNewParticipants(() =>
			trip.participants.map((participant) => ({
				userModel: participant.userId,
				isGuide: trip.guides.some((g) => g._id === participant.userId._id),
			}))
		);
	}, [trip]);

	const handleAddGuide = (userId: string) => {
		if (!trip) return;
		setNewParticipants((prev) => {
			return prev.map((p) => {
				if (p.userModel._id === userId) {
					return { ...p, isGuide: true };
				}
				return p;
			});
		});
	};

	const handleRemoveGuide = (userId: string) => {
		setNewParticipants((prev) => {
			return prev.map((p) => {
				if (p.userModel._id === userId) {
					return { ...p, isGuide: false };
				}
				return p;
			});
		});
	};

	const handleClose = () => {
		setNewParticipants([]);
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
		if (!error) {
			onClose();
			toggle();
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
					{newParticipants?.length > 0 ? (
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
								{error ? 'bed req' : loading ? 'loading' : 'submit'}
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
