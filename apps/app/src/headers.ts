import { cookies, headers } from 'next/headers';
import {
	cookies as cookiesConfig,
	headers as headersConfig,
} from '@nw/config';
import { EnumDeviceType } from '@/enums';

export const getLocale = (): string =>
	cookies().get(cookiesConfig.LOCALE)?.value || process.env.NEXT_PUBLIC_DEFAULT_LOCALE! || 'en';

export const getTheme = () => cookies().get(cookiesConfig.THEME)?.value;

export const getPathname = (): string => headers().get(headersConfig.PATHNAME) || '/';

export const getDevice = (): EnumDeviceType => {
	const value = cookies().get(cookiesConfig.DEVICE)?.value;
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

export const getSession = () => cookies().get(cookiesConfig.SESSION)?.value;
export const getTrail = () => cookies().get(cookiesConfig.TRAIL)?.value;
export const getRefreshToken = () => cookies().get(cookiesConfig.REFRESH_TOKEN)?.value;