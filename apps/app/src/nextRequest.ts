import { NextRequest } from 'next/server';
import { COOKIES, HEADERS, LOCALES } from '@nw/config';
import { EnumDeviceType } from '@/enums';

export const getLocale = (request: NextRequest): string =>
	request.cookies.get(COOKIES.LOCALE)?.value ||
	process.env.NEXT_PUBLIC_DEFAULT_LOCALE! ||
	LOCALES.EN;

export const getTheme = (request: NextRequest) =>
	request.cookies.get(COOKIES.THEME)?.value;

export const getSearchParams = (request: NextRequest): URLSearchParams =>
	new URLSearchParams(request.headers.get(HEADERS.SEARCH_PARAMS) || '');
export const getPathname = (request: NextRequest): string =>
	request.headers.get(HEADERS.PATHNAME) || '/';

export const getDevice = (request: NextRequest): EnumDeviceType => {
	const value = request.cookies.get(COOKIES.DEVICE)?.value;
	switch (value) {
		case EnumDeviceType.DESKTOP:
			return EnumDeviceType.DESKTOP;
		case EnumDeviceType.TABLET:
			return EnumDeviceType.TABLET;
		case EnumDeviceType.MOBILE:
			return EnumDeviceType.MOBILE;
		default:
			return EnumDeviceType.NONE;
	}
};
export const isDesktop = (request: NextRequest) =>
	getDevice(request) === EnumDeviceType.DESKTOP;
export const isMobile = (request: NextRequest) =>
	getDevice(request) === EnumDeviceType.MOBILE;
export const isTablet = (request: NextRequest) =>
	getDevice(request) === EnumDeviceType.TABLET;

export const getSession = (request: NextRequest) =>
	request.cookies.get(COOKIES.SESSION)?.value;
export const getTrail = (request: NextRequest) =>
	request.cookies.get(COOKIES.TRAIL)?.value;
export const getRefreshToken = (request: NextRequest) =>
	request.cookies.get(COOKIES.REFRESH_TOKEN)?.value;
