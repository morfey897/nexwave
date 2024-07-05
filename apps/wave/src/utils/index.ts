import { humanId } from 'human-id';
import { EnumColor, EnumTheme } from '~/constants/enums';
import { nanoid } from 'nanoid';
import { ValidationError } from 'yup';
import { IError } from '~/types';

interface InternalError {
	cause: {
		code?: string;
		redirect?: boolean;
		message: string;
	};
}

export const addZiro = (str: string | number) => `0${str}`.slice(-2);

export function isNotNull<T>(key: string) {
	// @ts-expect-error key could be anything
	return (item: unknown): item is T => item[key] !== null;
}

export function buildDynamicHref(
	href: string,
	params: { uuid: string; id?: number }
): string;
export function buildDynamicHref(
	href: string,
	params: { [key: string]: string | number }
): string {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc.replace(`[${key}]`, String(value)),
		href
	);
}

export function findDynamicPath(pathname: string, dynamicPaths: string[]) {
	return dynamicPaths.find((path) => {
		const regex = new RegExp(`^${path.replace(/\[.*?\]/g, '.*')}$`);
		return regex.test(pathname);
	});
}

export const abbrev = (
	...pairs: Array<Array<string | undefined | null> | undefined | null>
) => {
	const [first, last] =
		pairs.find((list) => !!list && !!list[0] && !!list[1]) ||
		Math.random().toString(36).substring(2, 2);
	return `${first ? first[0] : ''}${last ? last[0] : ''}`.toUpperCase();
};

export const fullname = (
	user:
		| {
				name?: string | null;
				surname?: string | null;
		  }
		| null
		| undefined
) => [user?.name, user?.surname].filter((v) => !!v).join(' ');

export const random = <T>(array: Array<T>) =>
	array[Math.floor(Math.random() * array.length)];

export const generateShortId = (size: number) => nanoid(size);

export function generateName(adjectiveCount: number = 2) {
	return humanId({
		separator: ' ',
		capitalize: true,
		adjectiveCount,
	});
}

export const getColorSchema = (color: string | EnumColor | undefined | null) =>
	color && (Object.values(EnumColor) as string[]).includes(color)
		? color
		: EnumColor.BLUE;

export function generateColor() {
	return random<EnumColor>(Object.values(EnumColor));
}

export function parseError(error: unknown): IError {
	if (error instanceof ValidationError) {
		return {
			code: error.errors,
			message: error.message,
		};
	}
	return {
		// @ts-expect-error error could be anything
		code: [String(error?.code || error?.cause?.code || 'unknown')],
		// @ts-expect-error error could be anything
		message: String(error.message || error?.cause?.message || 'Unknown error'),
	};
}

export function parseRedirect(error: unknown) {
	return {
		// @ts-expect-error error could be anything
		shouldRedirect: (error?.redirect || error?.cause?.redirect) === true,
		// @ts-expect-error error could be anything
		url: String(error?.url || error?.cause?.url || ''),
	};
}

export const hasAccess = (permission: number | undefined, role: number) =>
	// eslint-disable-next-line no-bitwise
	((permission || 0) & role) === role;

export const doRedirect = (url: string) =>
	new Error('Redirect', { cause: { redirect: true, url } }) as InternalError;

export const doError = (code: string, message?: string) =>
	new Error(message || 'InternalError', { cause: { code } }) as InternalError;

export const getSystemTheme = () =>
	window.matchMedia('(prefers-color-scheme: dark)').matches
		? EnumTheme.DARK
		: EnumTheme.LIGHT;

export const getClassTheme = () => {
	const { classList } = document.documentElement;
	if (
		classList.contains(EnumTheme.DARK) ||
		classList.contains(EnumTheme.LIGHT)
	) {
		return classList.contains(EnumTheme.DARK)
			? EnumTheme.DARK
			: EnumTheme.LIGHT;
	}
	return null;
};
