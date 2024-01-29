import { cookies, headers } from 'next/headers';
import { COOKIES, HEADERS } from '@nw/config';
import { EnumDeviceType } from '@/enums';

export const getLocale = (): string =>
	cookies().get(COOKIES.LOCALE)?.value ||
	process.env.NEXT_PUBLIC_DEFAULT_LOCALE! ||
	'en';

export const getTheme = () => cookies().get(COOKIES.THEME)?.value;

export const getPathname = (): string =>
	headers().get(HEADERS.PATHNAME) || '/';

export const getDevice = (): EnumDeviceType => {
	const value = cookies().get(COOKIES.DEVICE)?.value;
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
export const isDesktop = () => getDevice() === EnumDeviceType.DESKTOP;
export const isMobile = () => getDevice() === EnumDeviceType.MOBILE;
export const isTablet = () => getDevice() === EnumDeviceType.TABLET;

export const getSession = () => cookies().get(COOKIES.SESSION)?.value;
export const getTrail = () => cookies().get(COOKIES.TRAIL)?.value;
export const getRefreshToken = () =>
	cookies().get(COOKIES.REFRESH_TOKEN)?.value;
