import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthContext } from '@/contexts/AuthContext';
import { IMessage, useTripSocket } from '@/contexts/SocketContext';
import { useTripContext } from '@/contexts/TripContext';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
	message: string;
}

const ChatView = () => {
	const { trip } = useTripContext();
	const { user } = useAuthContext();
	const { socket, messages } = useTripSocket();
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const handleSendMessage: SubmitHandler<FormValues> = ({ message }) => {
		if (!trip || !user || !socket) return;

		// addMessage({
		// 	userId: '',
		// 	message,
		// 	timestamp: new Date().toLocaleTimeString([], {
		// 		hour: '2-digit',
		// 		minute: '2-digit',
		// 	}),
		// });

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
				className='flex flex-grow flex-col justify-end py-4 gap-2 overflow-y-scroll'
			>
				{messages.map((message, index) => (
					<Message message={message} key={index} userId={user?._id} />
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

function Message({ message, userId }: { message: IMessage; userId?: string }) {
	return (
		<div
			className={`w-fit max-w-[80%] rounded-2xl border-2 p-2 dark:text-dark ${
				message.userId === userId
					? 'self-start bg-green-200 text-left'
					: 'self-end bg-blue-200 text-right'
			}`}
		>
			{message.userId !== userId && (
				<span className='font-semibold'>{message.userId}</span>
			)}
			<div
				className={`flex flex-row ${message.userId !== userId ? 'flex-row-reverse' : ''}`}
			>
				<p className={`ml-2`}>{message.message}</p>
				<span className='mx-3 text-xs text-gray-500'>{message.timestamp}</span>
			</div>
		</div>
	);
}
