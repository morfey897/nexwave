import { LOCALES } from '@nw/config';
import { StateEnum, IUser } from '@nw/storage';
import { EnumResponseStatus } from '~/constants/enums';

export type TLocale = (typeof LOCALES.LIST)[number];

export type TUID = {
	id: number;
	uuid: string;
};

export interface IError {
	code: string[];
	message: string;
}

export interface IResponse<T = unknown> {
	status: EnumResponseStatus;
	error?: IError;
	data?: T;
}

export interface IInfo {
	name: string;
	info: string | null;
	image: string | null;
	color: string | null;
	currency: string | null;
	timezone: string | null;
	langs: string[] | null;

	state: StateEnum;

	createdAt: Date;
	updatedAt: Date;
}

export interface IClient extends TUID {
	name: string;
	surname: string;
	phone?: string;
	avatar?: string;
}
