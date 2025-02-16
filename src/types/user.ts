interface BaseUser {
	_id: string;
	role: 'user' | 'guest';
}
// export interface IUserResponseData {
// 	email?: string;
// 	name?: string;
// 	imageUrl?: string;
// 	_id: string;
// 	role: 'user' | 'guest';
// }

interface GuestData extends BaseUser {
	role: 'guest';
}

interface UserData extends BaseUser {
	role: 'user';
	email: string;
	name?: string;
	imageUrl?: string;
}

export type IUserResponseData = GuestData | UserData;
