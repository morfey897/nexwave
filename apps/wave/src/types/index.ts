import { LOCALES } from '@nw/config';
import { EnumLevel, EnumResponseStatus } from '~/constants/enums';

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

export interface IAlert {
	uuid: string;
	level?: EnumLevel;
	headline: string;
	subheadline: string;
	buttons: [string, string] | string;
	onSubmit: () => void;
	onCancel?: () => void;
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

export interface ViewActionContentLayoutProps {
	name: string;
	picture: JSX.Element | undefined;
	number: string;
	badge: JSX.Element;
	iconBlock?: JSX.Element;
	iconHidden?: JSX.Element;
	iconPlus?: JSX.Element;
}
