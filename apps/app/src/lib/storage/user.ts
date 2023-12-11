import { ColumnType, Generated } from 'kysely';

export interface IUserTable {
	uid: Generated<number>;
	name: string;
	nikname: string;
	password: string;
	surname: string | null;
	avatar: string | null;
	gender: string | null;
	birthday: Date | null;
	bio: string | null;
	created_at: ColumnType<Date, Date | string, never>;
	last_visit_at: Date;
	last_login_at: Date;
	contacts: Record<
		| 'email'
		| 'phone'
		| 'instagram'
		| 'facebook'
		| 'twitter'
		| 'linkedin'
		| 'telegram'
		| 'whatsapp'
		| 'viber',
		string
	> | null;
}
