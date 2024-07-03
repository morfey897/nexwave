import { LOCALES } from '@nw/config';
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

export type TLocale = (typeof LOCALES.LIST)[number];
