interface BaseUser {
	_id: string;
	role: 'user' | 'guest';
	name?: string;
}

interface GuestData extends BaseUser {
	role: 'guest';
}

interface UserData extends BaseUser {
	role: 'user';
	email: string;
	imageUrl?: string;
}

export type IUserResponseData = GuestData | UserData;
