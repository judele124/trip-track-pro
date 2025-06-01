import useToggle from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../icons/Icon';
import { useEffect } from 'react';
import InputFeildError from '../ui/InputFeildError';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const profileImageSchema = z.object({
	profileImage: z
		.any()
		.refine((filelist) => filelist[0] instanceof File, {
			message: 'Please upload a file.',
		})
		.refine((filelist) => filelist[0]?.size <= MAX_FILE_SIZE, {
			message: 'File size must be less than 5MB.',
		})
		.refine((filelist) => ACCEPTED_IMAGE_TYPES.includes(filelist[0]?.type), {
			message: 'Only .jpeg, .png formats are supported.',
		}),
});

interface ProfileImageProps {
	imageUrl: string;
	className?: string;
	enableEdit?: boolean;
}

export const ProfileImage = ({
	imageUrl,
	className = '',
	enableEdit = false,
}: ProfileImageProps) => {
	return (
		<div className={`relative inline-block ${className}`}>
			<img
				src={imageUrl}
				alt={'profile image'}
				className={`size-20 rounded-full bg-dark object-cover dark:bg-light`}
			/>
			{enableEdit && <ProfileImageEditButton imageUrl={imageUrl} />}
		</div>
	);
};

function ProfileImageEditButton({ imageUrl }: { imageUrl: string }) {
	const { toggle: toggleEdit, isOpen: isEditOpen } = useToggle(false);

	return (
		<>
			<div
				onClick={toggleEdit}
				className='absolute -bottom-0 -right-0 rounded-full bg-secondary p-2 shadow-md'
			>
				<Icon name='edit' size='16' className={`fill-white`} />
			</div>

			{isEditOpen && (
				<EditImageModal toggleEdit={toggleEdit} imageUrl={imageUrl} />
			)}
		</>
	);
}
function EditImageModal({
	toggleEdit,
	imageUrl,
}: {
	toggleEdit: () => void;
	imageUrl: string;
}) {
	const { register, handleSubmit, watch, formState, setValue } = useForm({
		resolver: zodResolver(profileImageSchema),
	});

	useEffect(() => {
		const fetchImage = async () => {
			const response = await fetch(imageUrl);
			const blob = await response.blob();
			const file = new File([blob], 'profile-image.jpg', {
				type: 'image/jpeg',
			});
			setValue('profileImage', [file]);
		};
		fetchImage();
	}, [setValue, imageUrl]);

	const newProfileImage = watch('profileImage')?.[0];

	return (
		<Modal center onBackdropClick={toggleEdit} open={true}>
			<form
				onSubmit={handleSubmit((data) => console.log('data', data))}
				className='page-colors flex max-w-[400px] flex-col gap-2 rounded-2xl p-6'
			>
				<h2 className='text-center text-xl font-semibold'>
					Edit Profile Image
				</h2>
				<Button
					onClick={(e) => e.currentTarget.querySelector('input')?.click()}
				>
					Click to upload
					<Input
						{...register('profileImage')}
						type='file'
						className='hidden'
						title={`Add image +`}
					/>
				</Button>
				<img
					src={
						newProfileImage ? URL.createObjectURL(newProfileImage) : imageUrl
					}
					alt='new profile image'
				/>
				{formState.errors.profileImage?.message && (
					<InputFeildError
						message={formState.errors.profileImage.message.toString()}
						className='mt-2'
					/>
				)}
				<Button type='submit' primary className='w-full'>
					Update
				</Button>
				<Button onClick={toggleEdit} className='w-full'>
					Close
				</Button>
			</form>
		</Modal>
	);
}
