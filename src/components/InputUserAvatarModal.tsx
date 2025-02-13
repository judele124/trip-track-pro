import useToggle from '@/hooks/useToggle';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import useAxios, { axios } from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import { Schemas } from 'trip-track-package';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputFeildError from './ui/InputFeildError';

export default function InputUserAvatarModal() {
	const { user } = useAuthContext();
	const {
		activate,
		data: randomName,
		error,
		loading,
	} = useAxios({
		manual: true,
	});

	const {
		watch,
		formState: { errors },
		handleSubmit,
		register,
		setValue,
	} = useForm<{
		name: string;
	}>({
		resolver: zodResolver(z.string({ message: 'Name is required' })),
	});

	// const { isOpen } = useToggle(user?.isNew ? true : false);
	const { isOpen } = useToggle(true);

	const nameDebounced = useDebouncedValue(name, 300);

	useEffect(() => {
		// if (!user?.isNew) return;
		handleGenerateRandomName();
	}, []);

	const handleGenerateRandomName = async () => {
		const { data } = await activate({
			url: `${API_BASE_URL}/user/random-name`,
		});
		setValue('name', data);
	};

	const src = (() => {
		if (loading) {
			return 'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952aui5tunhas7rsybn9vumavkvdfvz88bxyjecfghh&ep=v1_gifs_search&rid=200w.gif&ct=g';
		}

		if (error) {
			return `https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg`;
		}

		return `https://robohash.org/${nameDebounced}.png`;
	})();

	return (
		<Modal
			containerClassName='page-padding w-[95vw] max-w-[400px]'
			onBackdropClick={() => {}}
			center={true}
			open={isOpen}
		>
			<form
				onSubmit={handleSubmit((data) => {
					console.log(data);
				})}
				className='page-colors flex flex-col justify-center gap-2 rounded-2xl p-5 text-center'
			>
				{errors.name?.message && (
					<InputFeildError message={errors.name.message} />
				)}
				<h5>This is you</h5>
				<UserAvatar src={src} name={name ?? randomName} />
				<p>see what happens when you type a new name</p>

				<Input
					value={watch('name') || ''}
					placeholder='Enter name'
					{...register('name')}
				/>
				<Button type='submit'>Confirm</Button>
				<Button type='button' onClick={handleGenerateRandomName}>
					Generate Random Name
				</Button>
			</form>
		</Modal>
	);
}

interface IUserAvatarProps {
	src: string;
	name: string;
}

function UserAvatar({ src, name }: IUserAvatarProps) {
	return (
		<>
			<img
				className='mx-auto size-28 rounded-full bg-secondary text-center'
				src={src}
				alt='User avatar image'
			/>
			<h6>{name}</h6>
		</>
	);
}
