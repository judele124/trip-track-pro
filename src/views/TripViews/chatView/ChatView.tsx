import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTripSocket, IMessage } from '@/contexts/SocketContext';
import { useTripContext } from '@/contexts/TripContext';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
	message: string;
}

const ChatView = () => {
	const { trip } = useTripContext();
	const { user } = useAuthContext();
	const { socket, messages, setMessages } = useTripSocket();
	const { register, handleSubmit, reset } = useForm<FormValues>();
	useEffect(() => {
		console.log(user?._id);
	}, [user]);
	const handleSendMessage: SubmitHandler<FormValues> = ({ message }) => {
		if (!trip || !user || !socket) return;

		const newMessage: IMessage = {
			userId: '',
			message,
			timestamp: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			}),
		};

		setMessages((prev) => [...prev, newMessage]);
		socket.emit(
			'sendMessage',
			trip._id.toString(),
			message,
			user._id.toString()
		);
		reset();
	};

	return (
		<div className='flex h-full flex-col px-4'>
			<div
				style={{ scrollbarWidth: 'none' }}
				className='flex flex-grow flex-col gap-2 overflow-y-scroll'
			>
				{messages.map((message, index) => (
					<div
						key={index + message.message}
						className={`w-fit max-w-[80%] rounded-2xl border-2 p-2 dark:text-dark ${
							message.userId === user?._id
								? 'self-start bg-green-200 text-left'
								: 'self-end bg-blue-200 text-right'
						}`}
					>
						<span className='font-semibold'>{message.userId}</span>
						<div
							className={`flex flex-row ${message.userId !== user?._id ? 'flex-row-reverse' : ''}`}
						>
							<p className={`ml-2`}>{message.message}</p>
							<span className='mx-3 text-xs text-gray-500'>
								{message.timestamp}
							</span>
						</div>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit(handleSendMessage)} className='flex gap-2'>
				<Input
					{...register('message', { required: true })}
					type='text'
					title='Message'
					placeholder='Message'
					autoComplete='off'
				/>
				<Button primary type='submit'>
					Send
				</Button>
			</form>
		</div>
	);
};

export default ChatView;
