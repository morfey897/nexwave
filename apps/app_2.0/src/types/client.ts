import { TUID } from '@/types/common';

export interface IClient extends TUID {
	avatar: string;
	name: string;
	surname: string;
	email: string;
	birthday?: string;
	phone: string;
	badges?: string;
	last_visit_at?: string;
	created_at?: string;
}
