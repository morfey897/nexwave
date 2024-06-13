import { LOCALES } from '@nw/config';
import { EnumResponseStatus } from '~enums';

export type TUID = {
	id: number;
	uuid: string;
};

export interface IError {
	code: string;
	message: string;
}

export interface IResponse<T extends any = undefined> {
	status: EnumResponseStatus;
	error?: IError;
	data?: T;
}

export type TLocale = (typeof LOCALES.LIST)[number];

export type SidebarItem =
	| {
			name: string;
			icon: JSX.Element;
			href: string;
			type?: 'item';
	  }
	| {
			type: 'divider';
	  };
