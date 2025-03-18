import { API_BASE_URL } from '@/env.config';
import { UseAxiosResponse } from '@/hooks/useAxios';
import { Types } from 'trip-track-package';

export const tripCreate = async (
	activate: UseAxiosResponse['activate'],
	tripData: Types['Trip']['Model']
): Promise<{ status: number; data?: any }> => {
	const formData = new FormData();

	const rewardImage = tripData.reward?.image;
	if (rewardImage) {
		formData.append('rewardImage', rewardImage);
	}

	const jsonData = JSON.stringify({
		description: tripData.description,
		groupName: tripData.groupName,
		name: tripData.name,
		stops: tripData.stops,
		...(tripData.reward ? { reward: { title: tripData.reward.title } } : {}),
	});

	formData.append('data', jsonData);

	const { data, status } = await activate({
		url: `${API_BASE_URL}/trip/create`,
		method: 'post',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return { data, status };
};

export const tripGet = async (
	activate: UseAxiosResponse['activate'],
	id: string
) => {
	const { data, status } = await activate({
		url: `${API_BASE_URL}/trip/${id}`,
		method: 'get',
	});

	return { data, status };
};

export const rewardUpdate = async (
	activate: UseAxiosResponse['activate'],
	id: string,
	rewardData: FormData
) => {
	const { data, status } = await activate({
		url: `${API_BASE_URL}/trip/reward/${id}`,
		method: 'put',
		data: rewardData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return { data, status };
};
