import { COOKIES, LOCALES } from '@nw/config';
import { EnumResponse } from '@/enums';

export interface IError {
	code: string;
	message: string;
}

export interface IResponse<T extends any = undefined> {
	status: EnumResponse;
	error?: IError;
	data?: T;
}

export type TLocale = (typeof LOCALES.LIST)[number];
