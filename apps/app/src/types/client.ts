import { TUID } from '@/types/common';

export enum EnumFilter {
	ALL = 'all', 
	ACTIVE = 'active', 
	INACTIVE = 'inactive',
}

export interface IClient extends TUID {
	avatar: string;
	name: string;
	surname: string;
	email: string;
	birthday?: string;
	phone: string;
	badges?: string;
	last_visit_at?: string;
}
