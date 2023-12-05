import { cookies, headers } from 'next/headers';
import {
	DEFAULT_LOCALE,
	LOCALE_COOKIE,
	THEME_COOKIE,
	DEVICE_COOKIE,
	PATHNAME_HEADER,
	SESSION_COOKIE,
	UID_COOKIE,
} from 'config';
import { EnumDevice } from './types/view';

export const getLocale = (): string =>
	cookies().get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;

export const getTheme = () => cookies().get(THEME_COOKIE)?.value;

export const getPathname = (): string => headers().get(PATHNAME_HEADER) || '/';

export const getDevice = (): EnumDevice => {
	const value = cookies().get(DEVICE_COOKIE)?.value;
	switch (value) {
		case EnumDevice.DESKTOP:
			return EnumDevice.DESKTOP;
		case EnumDevice.TABLET:
			return EnumDevice.TABLET;
		case EnumDevice.MOBILE:
			return EnumDevice.MOBILE;
		default:
			return EnumDevice.NONE;
	}
};
export const isDesktop = () => getDevice() === EnumDevice.DESKTOP;
export const isMobile = () => getDevice() === EnumDevice.MOBILE;
export const isTablet = () => getDevice() === EnumDevice.TABLET;

export const getSession = () => cookies().get(SESSION_COOKIE)?.value;
export const getUID = () => cookies().get(UID_COOKIE)?.value;