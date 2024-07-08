import { GenderEnum, StateEnum } from '../enums';
import { IDate } from './utils';

export type TUID = {
	id: number;
	uuid: string;
};

export interface IAccess {
	role: string;
	permission: number;
	roles: Record<string, number>;
}

export interface IUser extends TUID, IDate {
	login: string;
	name: string | null;
	surname: string | null;
	birthday: string | null;
	avatar: string | null;
	gender: GenderEnum;
	bio: string | null;
	contacts: Record<string, string>;
	meta: Record<string, string>;
}

export interface IClient extends IUser {
	// add client specific fields here
	lastVisitAt: Date | null;
}

export interface IEmployee extends IUser {
	role: string;
}

export interface IProject extends TUID, IDate, IAccess {
	name: string;
	info: string | null;
	image: string | null;
	color: string | null;
	currency: string | null;
	timezone: string | null;
	langs: string[] | null;
	state: StateEnum;
	address: {
		country?: string;
		city?: string;
		address_line?: string;
		address_line_2?: string;
	};
	contacts: Record<string, string>;
	spaces: Array<{ id: string; name: string }>;
}
