import { useState } from 'react';
import { IMessage } from '../types';

interface IUseSocketMessagesValue {
	addMsgToMsgs: (message: IMessage) => void;
	messages: IMessage[];
	unreadMessagesState: {
		count: number;
		isInChat: boolean;
	};
	setUnreadMessagesState: (state: { count: number; isInChat: boolean }) => void;
}
export default function useSocketMessages(): IUseSocketMessagesValue {
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
		setUnreadMessagesState((prev) => ({
			...prev,
			count: prev.isInChat ? 0 : prev.count + 1,
		}));
	};

	return {
		messages,
		addMsgToMsgs,
		unreadMessagesState,
		setUnreadMessagesState,
	};
}
