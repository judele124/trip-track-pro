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
import { tripUpdate } from '@/servises/tripService';

interface IRewardDetailsProps {
	reward: Trip['reward'];
	trip: Trip;
}

export default function RewardDetails({ reward, trip }: IRewardDetailsProps) {
	const { isOpen, toggle } = useToggle();
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

	const { activate, loading, error, status } = useAxios({
		manual: true,
	});

	const rewardImageRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			setValue('image', undefined);
		}
	}, [isOpen]);

	const { ref, ...rewardImageRegisterReturn } =
		!reward && isOpen
			? register('image', {
					onChange: (e) => setValue('image', e.target.files[0] || undefined),
				})
			: {};

	return (
		<>
			<button
				onClick={toggle}
				className='rounded-xl border-2 border-dark bg-[#ffb900] px-2 py-1 text-center text-sm text-dark'
			>
				{reward ? `${reward?.title} 🏆` : 'Add reward'}
			</button>
			{reward ? (
				<Modal open={isOpen} onBackdropClick={toggle} center>
					<div className='page-colors w-[90vw] max-w-[400px] rounded-2xl p-5 text-center'>
						<h3>
							{!reward.image ? 'No reward image was uploaded' : reward.title}
						</h3>
						{reward.image && (
							<img className='mt-2 rounded-lg' src={reward.image} alt='' />
						)}
					</div>
				</Modal>
			) : (
				<Modal
					containerClassName='w-full page-x-padding max-w-[450px]'
					open={isOpen}
					onBackdropClick={toggle}
					center
				>
					<form
						className={`page-colors relative flex w-full flex-col gap-2 rounded-2xl p-4 transition-all delay-150 duration-200 ease-in-out`}
						onSubmit={handleSubmit((data) => {
							const { name, stops, status, description, participants } = trip;
							tripUpdate(activate, trip._id, {
								name,
								stops,
								status,
								description,
								participants,
								reward: data,
							});
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
							Confirm Reward
						</Button>

						<Button
							type='button'
							className='bg-transparent px-0 py-0 text-dark underline underline-offset-1 dark:text-light'
							onClick={() => {
								setValue('image', undefined);
								setValue('title', '');
							}}
						>
							Delete Reward
						</Button>
					</form>
				</Modal>
			)}
		</>
	);
}
