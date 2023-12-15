import { cookies, headers } from 'next/headers';
import {
	cookies as cookiesConfig,
	headers as headersConfig,
} from 'config';
import { EnumDevice } from './types/view';

export const getLocale = (): string =>
	cookies().get(cookiesConfig.LOCALE)?.value || process.env.NEXT_PUBLIC_DEFAULT_LOCALE! || 'en';

export const getTheme = () => cookies().get(cookiesConfig.THEME)?.value;

export const getPathname = (): string => headers().get(headersConfig.PATHNAME) || '/';

export const getDevice = (): EnumDevice => {
	const value = cookies().get(cookiesConfig.DEVICE)?.value;
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

export const getSession = () => cookies().get(cookiesConfig.SESSION)?.value;
export const getTrail = () => cookies().get(cookiesConfig.TRAIL)?.value;
export const getRefreshToken = () => cookies().get(cookiesConfig.REFRESH_TOKEN)?.value;