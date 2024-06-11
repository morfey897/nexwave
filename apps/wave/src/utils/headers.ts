import { cookies, headers } from 'next/headers';
import { COOKIES, HEADERS, LOCALES } from '@nw/config';
import { EnumDeviceType } from '~enums';

export const getI18n = (): string =>
	cookies().get(COOKIES.LOCALE)?.value ||
	process.env.NEXT_PUBLIC_DEFAULT_LOCALE! ||
	LOCALES.EN;

export const getSearchParams = (): URLSearchParams =>
	new URLSearchParams(headers().get(HEADERS.SEARCH_PARAMS) || '');
export const getPathname = (): string => headers().get(HEADERS.PATHNAME) || '/';

export const getDevice = (): EnumDeviceType =>
	(cookies().get(COOKIES.DEVICE)?.value as EnumDeviceType) ||
	EnumDeviceType.DESKTOP;

export const getSession = () => cookies().get(COOKIES.SESSION)?.value;
export const getTrail = () => cookies().get(COOKIES.TRAIL)?.value;
export const getRefreshToken = () =>
	cookies().get(COOKIES.REFRESH_TOKEN)?.value;
