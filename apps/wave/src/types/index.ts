import { LOCALES } from '@nw/config';
import { EnumResponseStatus } from '~/constants/enums';

export type TLocale = (typeof LOCALES.LIST)[number];

export interface IError {
	code: string[];
	message: string;
}

export interface IResponse<T = unknown> {
	status: EnumResponseStatus;
	error?: IError;
	data?: T;
}
