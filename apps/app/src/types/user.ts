import { TUID } from '@/types/common';

export enum EnumFilter {
	ALL = 'all', 
	ACTIVE = 'active', 
	INACTIVE = 'inactive',
}

export interface IUser extends TUID {
	avatar: string;
	name: string;
	surname: string;
	email: string;
	phone: string;
	birthday?: string;
	
	badges?: string;
	last_visit_at?: string;
	created_at?: string;
}
