import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import Button from '@/components/ui/Button';
import InputFeildError from '@/components/ui/InputFeildError';
import InputWLabel from '@/components/ui/InputWLabel';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Input from '@/components/ui/Input';
import { mergeRefs } from '@/utils/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { rewardSchema } from '@/validationSchemas/trip';
import useAxios from '@/hooks/useAxios';
import { rewardUpdate } from '@/servises/tripService';
import { getErrorMessage } from '@/utils/errorMessages';

interface IRewardDetailsProps {
	reward: Trip['reward'];
	onUpdate: () => void;
	tripId: string;
}

export default function RewardDetails({
	reward,
	onUpdate,
	tripId,
}: IRewardDetailsProps) {
	const { isOpen, toggle } = useToggle();
	const { isOpen: editModeIsOpen, toggle: toggleEditMode } = useToggle();

	return (
		<>
			<button
				onClick={toggle}
				className='rounded-xl border-2 border-dark bg-[#ffb900] px-3 py-1 text-center text-sm capitalize text-dark'
			>
				{reward ? `${reward?.title} 🏆` : 'Add reward'}
			</button>
			{reward && (
				<Modal open={isOpen} onBackdropClick={toggle} center>
					<div className='page-colors w-[90vw] max-w-[400px] rounded-3xl p-5 text-center'>
						<h3>
							{!reward.image ? 'No reward image was uploaded' : reward.title}
						</h3>
						{reward.image && (
							<img className='mt-2 rounded-2xl' src={reward.image} alt='' />
						)}
						<div className='mt-2 flex items-center gap-2'>
							<Button
								className='w-full text-white dark:bg-secondary'
								onClick={toggle}
							>
								Close
							</Button>
							<Button className='w-full' onClick={toggleEditMode}>
								Edit
							</Button>
						</div>
					</div>
				</Modal>
			)}
			<RewardDetailsModalForm
				isOpen={editModeIsOpen}
				toggle={toggleEditMode}
				tripId={tripId}
				onUpdate={onUpdate}
			/>
		</>
	);
}

interface IRewardDetailsModalFormProps {
	isOpen: boolean;
	toggle: () => void;
	tripId: string;
	onUpdate: () => void;
}

function RewardDetailsModalForm({
	isOpen,
	toggle,
	tripId,
	onUpdate,
}: IRewardDetailsModalFormProps) {
	const {
		register,
		formState: { errors },
		setValue,
		watch,
		handleSubmit,
	} = useForm<{
		title: string;
		image?: File | undefined;
	}>({
		resolver: zodResolver(rewardSchema),
	});

	const {
		activate,
		loading,
		error,
		status,
		data: updatedTripData,
	} = useAxios({
		manual: true,
	});

	const rewardImageRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			setValue('image', undefined);
		}
	}, [isOpen]);

	useEffect(() => {
		if (updatedTripData) {
			onUpdate();
		}
	}, [updatedTripData]);

	const { ref, ...rewardImageRegisterReturn } = register('image', {
		onChange: (e) => setValue('image', e.target.files[0] || undefined),
	});

	return (
		<Modal
			containerClassName='w-full page-x-padding max-w-[450px]'
			open={isOpen}
			onBackdropClick={toggle}
			center
		>
			<form
				className={`page-colors relative flex w-full flex-col gap-2 rounded-2xl p-4 transition-all delay-150 duration-200 ease-in-out`}
				onSubmit={handleSubmit(({ title, image }) => {
					const formData = new FormData();
					if (image) formData.append('rewardImage', image);
					formData.append('title', title);

					rewardUpdate(activate, tripId, formData);
				})}
				onClick={(e) => e.stopPropagation()}
			>
				{errors.title?.message && (
					<InputFeildError message={errors.title.message} />
				)}

				{/* Reward title */}
				<InputWLabel
					className='border-dark dark:border-light'
					{...register('title')}
					value={watch('title')}
				/>
				{errors.image?.message && (
					<InputFeildError message={errors.image?.message} />
				)}

				{/* Reward Image */}
				<Button onClick={() => rewardImageRef.current?.click()}>
					{watch('image')?.name || 'Add image +'}
					<Input
						ref={mergeRefs(ref, rewardImageRef)}
						type='file'
						className='hidden'
						title={`${watch('image')?.name || 'Add image +'}`}
						{...rewardImageRegisterReturn}
					/>
				</Button>

				{/* Reward Buttons */}
				<Button type='submit' primary>
					{loading ? 'Saving...' : 'Save'}
				</Button>

				<Button
					type='button'
					className='bg-transparent px-0 py-0 text-dark underline underline-offset-1 dark:text-light'
					onClick={() => {
						setValue('image', undefined);
						setValue('title', '');
						toggle();
					}}
				>
					Cancel
				</Button>

				{error && status && (
					<p className='text-red-500'>{getErrorMessage(status)}</p>
				)}
			</form>
		</Modal>
	);
}
