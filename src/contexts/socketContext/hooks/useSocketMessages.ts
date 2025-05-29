import { SocketClientType } from '@/types/socket';
import { useEffect, useState } from 'react';
import { IRedisUserTripData } from '../types';
import { IMessage } from '../types';
interface IUseSocketMessagesProps {
	socket: SocketClientType | null;
	usersInLiveTripData: IRedisUserTripData[] | undefined;
}

interface IUseSocketMessagesValue {
	addMsgToMsgs: (message: IMessage) => void;
	messages: IMessage[];
	unreadMessagesState: {
		count: number;
		isInChat: boolean;
	};
	setUnreadMessagesState: (state: { count: number; isInChat: boolean }) => void;
}
export default function useSocketMessages({
	socket,
	usersInLiveTripData,
}: IUseSocketMessagesProps): IUseSocketMessagesValue {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [unreadMessagesState, setUnreadMessagesState] = useState<{
		count: number;
		isInChat: boolean;
	}>({
		count: 0,
		isInChat: false,
	});

	const addMsgToMsgs = (message: IMessage) => {
		setMessages((prev) => [...prev, message]);
	};

	useEffect(() => {
		if (!socket) return;
		socket.on('messageSent', (message, userId) => {
			addMsgToMsgs({
				userId,
				message,
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
				userName: usersInLiveTripData?.find((user) => user.userId === userId)
					?.name,
			});
			setUnreadMessagesState((prev) => ({
				...prev,
				count: prev.isInChat ? 0 : prev.count + 1,
			}));
		});
	}, [socket, usersInLiveTripData]);

	return {
		messages,
		addMsgToMsgs,
		unreadMessagesState,
		setUnreadMessagesState,
	};
}
