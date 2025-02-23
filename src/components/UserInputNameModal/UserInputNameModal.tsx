import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFeildError from '../ui/InputFeildError';
import { Schemas } from 'trip-track-package';
import { useAuthContext } from '@/contexts/AuthContext';

const LOADER_GIF =
	'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952aui5tunhas7rsybn9vumavkvdfvz88bxyjecfghh&ep=v1_gifs_search&rid=200w.gif&ct=g';

interface IUserInputNameModalProps {
	onSubmit: ({ name, imageUrl }: { name: string; imageUrl: string }) => void;
}

export default function UserInputNameModal({
	onSubmit,
}: IUserInputNameModalProps) {
	const { user } = useAuthContext();
	const {
		activate,
		data: randomName,
		loading,
	} = useAxios({
		manual: true,
	});

	const {
		trigger,
		watch,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<{ name: string }>({
		resolver: zodResolver(
			Schemas.user.pick({
				name: true,
			})
		),
	});

	const [randomNameError, setRandomNameError] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState('');
	const inputValueDebaunced = useDebouncedValue(inputValue, 500);
	const name = watch('name');

	useEffect(() => {
		if (!user) return;

		activate({
			url: `${API_BASE_URL}/user/random-name`,
		}).then(({ data: name }) => setInputValue(name));
	}, []);

	useEffect(() => {
		if (!inputValueDebaunced) return;
		setValue('name', inputValueDebaunced);
		trigger('name').then((isValid) => {
			if (!isValid) setValue('name', inputValueDebaunced);
		});
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
		setInputValue(name);
	};

	return (
		<Modal
			containerClassName='page-padding w-[95vw] max-w-[400px]'
			onBackdropClick={() => {}}
			center={true}
			open={true}
		>
			<form
				onSubmit={handleSubmit(({ name }) => {
					onSubmit({ name, imageUrl: `https://robohash.org/${name}.png` });
				})}
				className='page-colors flex flex-col justify-center gap-2 rounded-2xl p-5 text-center'
			>
				<h5>This is you</h5>
				<img
					className='mx-auto size-28 rounded-full bg-secondary text-center'
					src={loading ? LOADER_GIF : `https://robohash.org/${name}.png`}
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
				<Button primary disabled={loading} type='submit'>
					Confirm
				</Button>
				<Button type='button' onClick={handleGenerateRandomName}>
					Generate Random Name
				</Button>
			</form>
		</Modal>
	);
}
