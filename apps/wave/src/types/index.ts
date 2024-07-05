import { LOCALES } from '@nw/config';
import { StateEnum } from '@nw/storage';
import { EnumResponseStatus } from '~/constants/enums';

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

export interface IAccess {
	role: string;
	permission: number;
	roles: Record<string, number>;
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

export interface ICurrentUser extends TUID {
	login: string;
	name?: string | null;
	surname?: string | null;
	avatar?: string | null;
}

export interface IProject extends TUID, IInfo, IAccess {
	// Children
}

export type TLocale = (typeof LOCALES.LIST)[number];
