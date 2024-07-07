import { IUser, GenderEnum } from '@nw/storage';

export const MOCK_USER: IUser = {
	id: 1,
	uuid: '00000000-0000-0000-0000-000000000000',
	login: 'localtest@nextwave.com.ua',
	name: 'Local',
	surname: 'Test',
	birthday: '1990-01-01',
	avatar: null,
	contacts: {},
	meta: {},
	createdAt: new Date(),
	updatedAt: new Date(),
	gender: GenderEnum.None,
	bio: null,
};
