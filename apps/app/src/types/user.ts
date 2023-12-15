import { TUID } from '@/types/common';

export enum EnumFilter {
	ALL = 'all',
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export interface IUser extends TUID {
	email: string;
	email_verified: boolean;
	avatar?: string | null;
	name?: string | null;
	surname?: string | null;
	birthday?: string | null; //Date or string?

	badges?: string | null; //Big question mark
	last_login_at?: string | null; //Date or timestamp?
	created_at?: string | null; //Date or timestamp?
}

export type ICurrentUser = Omit<
	IUser,
	'birthday' | 'badges' | 'last_login_at' | 'created_at'
>;
