import { useEffect, useState } from 'react';
import { SocketClientType } from '@/types/socket';
import { API_BASE_URL } from '@/env.config';
import useAxios from '@/hooks/useAxios';
import { IRedisUserTripData } from '../types';

interface IUseSocketExperiencesProps {
	socket: SocketClientType | null;
	tripId: string;
	setUsersInLiveTripExpData: React.Dispatch<
		React.SetStateAction<IRedisUserTripData[]>
	>;
}

export interface IUseSocketExperiencesValue {
	isExperienceActive: boolean;
	currentExpIndex: number;
	setExperienceActive: React.Dispatch<React.SetStateAction<boolean>>;
	initExpirenceIndex: () => void;
}

export default function useSocketExperiences({
	socket,
	tripId,
	setUsersInLiveTripExpData,
}: IUseSocketExperiencesProps): IUseSocketExperiencesValue {
	const [currentExpIndex, setCurrentExpIndex] = useState<number>(0);
	const [isExperienceActive, setExperienceActive] = useState(false);

	const { activate: activateGetExpIndex, data: dataCurrentExpIndex } =
		useAxios<{ data: number }>({
			manual: true,
		});

	const initExpirenceIndex = async () => {
		const { data } = await activateGetExpIndex({
			url: `${API_BASE_URL}/trip/current-exp-index/${tripId}`,
		});
		if (data) {
			setCurrentExpIndex(data.data || 0);
		}
	};

	useEffect(() => {
		if (!socket) return;

		socket.on('allUsersInExperience', (isAllUSersInExperience) => {
			setExperienceActive(true);
		});

		socket.on('experienceFinished', (data, userId) => {
			setUsersInLiveTripExpData((prev) => {
				const userIndex = prev.findIndex((user) => user.userId === userId);
				if (userIndex === -1) {
					return [...prev, data];
				}
				return [
					...prev.slice(0, userIndex),
					data,
					...prev.slice(userIndex + 1),
				];
			});
		});

		socket.on('allUsersFinishedCurrentExp', (nextStepIndex) => {
			setCurrentExpIndex(nextStepIndex);
		});
	}, [socket]);

	return {
		currentExpIndex,
		isExperienceActive,
		setExperienceActive,
		initExpirenceIndex,
	};
}
