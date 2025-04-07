import { API_BASE_URL } from '@/env.config';
import { UseAxiosResponse } from '@/hooks/useAxios';
import { Trip } from '@/types/trip';
import { getErrorMessage } from '@/utils/errorMessages';
import { ServiceError } from '@/utils/ServiceError';
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

export const tripUpdate = async (
	activate: UseAxiosResponse['activate'],
	id: string,
	tripData: Partial<Trip>
) => {
	const { data, status } = await activate({
		url: `${API_BASE_URL}/trip/${id}`,
		method: 'PUT',
		data: tripData,
	});
	console.log(tripData);
	console.log(data);

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

export const startTrip = async (
	activate: UseAxiosResponse['activate'],
	id: string
) => {
	await activate({
		method: 'POST',
		url: `${API_BASE_URL}/trip/start/${id}`,
	});
};

export const endTrip = async (
	activate: UseAxiosResponse['activate'],
	id: string
) => {
	await activate({
		method: 'POST',
		url: `${API_BASE_URL}/trip/end/${id}`,
	});
};

export const joinTrip = async (
	activate: UseAxiosResponse['activate'],
	id: string,
	userData: {
		name?: string;
		imageUrl?: string;
	}
) => {
	try {
		if (!userData?.name || !userData.imageUrl) {
			throw new ServiceError(getErrorMessage(422), 422);
		}

		const { data, status, error } = await activate({
			url: `${API_BASE_URL}/trip/user-join/${id}`,
			method: 'POST',
			data: userData,
		});

		if (error) {
			throw new ServiceError(getErrorMessage(status), status);
		}

		await activate({
			url: `${API_BASE_URL}/trip/user-to-participants/${id}`,
			method: 'PUT',
		});

		return { data, status };
	} catch (error) {
		throw error;
	}
};

export const leaveTrip = async (
	activate: UseAxiosResponse['activate'],
	id: string
) => {
	await activate({
		url: `${API_BASE_URL}/trip/user-leave/${id}`,
		method: 'DELETE',
	});

	await activate({
		url: `${API_BASE_URL}/trip/remove-user-from-participants/${id}`,
		method: 'PUT',
	});
};

export const deleteTrip = async (
	activate: UseAxiosResponse['activate'],
	id: string
) => {
	await activate({
		url: `${API_BASE_URL}/trip/${id}`,
		method: 'DELETE',
	});
};

export const cancelTrip = async (
	activate: UseAxiosResponse['activate'],
	id: string
) => {
	await activate({
		url: `${API_BASE_URL}/trip/status/${id}`,
		method: 'PUT',
		data: {
			status: 'cancelled',
		},
	});
};
