import { LOCALES } from '@nw/config';
import { EnumResponseStatus } from '~/constants/enums';

export type TLocale = (typeof LOCALES.LIST)[number];

export interface IParamsProps {
	uuid: string;
}

export type IParams = {
	params: IParamsProps;
};

export interface IError {
	code: string[];
	message: string;
}

export interface IResponse<T = undefined> {
	status: EnumResponseStatus;
	error?: IError;
	data: T | null;
}

export interface ErrorLayoutProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	instructions: string[];
	showForgotPassword?: boolean;
}

interface Permission {
	[role: string]: boolean | string;
}

export interface AccessLevelsTablePermissions {
	[key: string]: Permission;
}

export interface EmployeeActionContentLayoutProps {
	name: string;
	value?: string | JSX.Element;
	picture?: JSX.Element;
}
