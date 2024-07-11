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
