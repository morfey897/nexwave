export interface IClient {
	_uid: string;
	avatar: string;
	name: string;
	surname: string;
	email: string;
	birthday?: string;
	phone: string;
	badges?: string;
	last_visit_at?: string;
}
