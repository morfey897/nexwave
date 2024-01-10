import { TUID } from '@/types/common';

export interface IUser extends TUID {
	email: string;
	emailVerified: boolean;
	avatar?: string | null;
	name?: string | null;
	surname?: string | null;
	birthday?: string | null; //Date or string?

	badges?: string | null; //Big question mark
	lastLoginAt?: string | null; //Date or timestamp?
	createdAt?: string | null; //Date or timestamp?
}

export type ICurrentUser = Omit<
	IUser,
	'birthday' | 'badges' | 'lastLoginAt' | 'createdAt'
>;
