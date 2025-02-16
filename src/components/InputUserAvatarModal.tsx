import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFeildError from './ui/InputFeildError';
import { Schemas } from 'trip-track-package';
import { z } from 'zod';
import { useAuthContext } from '@/contexts/AuthContext';

interface IInputUserAvatarModalProps {
	allowGuest?: boolean;
}

export default function InputUserAvatarModal({
	allowGuest,
}: IInputUserAvatarModalProps) {
	const { user } = useAuthContext();
	const {
		activate,
		data: randomName,
		loading,
	} = useAxios({
		manual: true,
	});
	const [randomNameError, setRandomNameError] = useState<string | null>(null);

	const {
		watch,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<z.infer<typeof Schemas.user>>({
		resolver: zodResolver(Schemas.user),
	});

	const [inputValue, setInputValue] = useState('');
	const inputValueDebaunced = useDebouncedValue(inputValue, 500);

	useEffect(() => {
		if (!user) return;

		activate({
			url: `${API_BASE_URL}/user/random-name`,
		}).then(({ data: name }) => setInputValue(name));
		if (user.role !== 'guest') {
			setValue('email', user.email);
		}
	}, []);

	const name = watch('name');

	useEffect(() => {
		setValue('imageUrl', `https://robohash.org/${name}.png`);
	}, [name]);

	useEffect(() => {
		if (!inputValueDebaunced) return;
		setValue('name', inputValueDebaunced);
	}, [inputValueDebaunced]);

	const handleGenerateRandomName = async () => {
		const { data: name, error } = await activate({
			url: `${API_BASE_URL}/user/random-name`,
		});

		if (error) {
			setRandomNameError(error.message);
			return;
		}
		setValue('name', name);
		setValue('imageUrl', `https://robohash.org/${name}.png`);
	};

	const onSubmit = async (formState: z.infer<typeof Schemas.user>) => {
		try {
			if (user?.role === 'guest') {
				await activate({
					url: `${API_BASE_URL}/user/profile`,
					method: 'PUT',
					data: formState,
				});
			}
			// update mongo
			await activate({
				url: `${API_BASE_URL}/user/profile`,
				method: 'PUT',
				data: formState,
			});

			// update user tokens
			await activate({
				url: `${API_BASE_URL}/auth/create-user-tokens`,
				method: 'GET',
			});
		} catch (error) {
			console.error(error);
		}
	};

	const imageSrc = loading
		? 'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952aui5tunhas7rsybn9vumavkvdfvz88bxyjecfghh&ep=v1_gifs_search&rid=200w.gif&ct=g'
		: watch('imageUrl');

	return (
		<Modal
			containerClassName='page-padding w-[95vw] max-w-[400px]'
			onBackdropClick={() => {}}
			center={true}
			open={true}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='page-colors flex flex-col justify-center gap-2 rounded-2xl p-5 text-center'
			>
				<h5>This is you</h5>
				<img
					className='mx-auto size-28 rounded-full bg-secondary text-center'
					src={imageSrc}
					alt='User avatar image'
				/>
				{randomNameError ? (
					<h6>{randomNameError}</h6>
				) : (
					<h6>{watch('name') ?? randomName}</h6>
				)}

				<p>see what happens when you type a new name</p>
				{errors.name?.message && (
					<InputFeildError message={errors.name.message} />
				)}
				<Input
					value={inputValue}
					placeholder='Enter name'
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<Button disabled={loading} type='submit'>
					Confirm
				</Button>
				<Button type='button' onClick={handleGenerateRandomName}>
					Generate Random Name
				</Button>
			</form>
		</Modal>
	);
}
