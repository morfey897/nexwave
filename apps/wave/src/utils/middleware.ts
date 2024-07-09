import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { COOKIES, LOCALES } from '@nw/config';
import { NextRequest, NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';
import { EnumDeviceType } from '~/constants/enums';
import { TLocale } from '~/types';

export const computeDevice = (request: NextRequest) => {
	const userAgent = request.headers.get('user-agent');
	const ua = UAParser(userAgent || undefined);
	switch (ua.device.type) {
		case 'mobile': {
			return EnumDeviceType.MOBILE;
		}
		case 'tablet': {
			return EnumDeviceType.TABLET;
		}
		default: {
			return EnumDeviceType.DESKTOP;
		}
	}
};

export const updateCookie = (
	response: NextResponse,
	cookies: Array<{
		name: string;
		value: string | null | undefined;
		maxAge?: number;
		httpOnly?: boolean;
		secure?: boolean;
	}>
) => {
	const setCookiesValue = response.headers.get('set-cookie');
	response.headers.set(
		'set-cookie',
		cookies
			.filter(({ name, value }) => Boolean(value) && Boolean(name))
			.map(({ name, value, maxAge, httpOnly, secure }) =>
				[
					`${name}=${value}`,
					'path=/',
					maxAge ? `Max-Age=${maxAge}` : undefined,
					httpOnly ? 'HttpOnly' : undefined,
					secure ? 'Secure' : undefined,
				]
					.filter((v) => Boolean(v))
					.join('; ')
			)
			.concat(setCookiesValue || '')
			.filter((v) => Boolean(v))
			.join(',')
	);
};

export function computeLocale(request: NextRequest) {
	const headers = {
		'accept-language': request.headers.get('accept-language') || '',
	};
	const languages = new Negotiator({ headers })
		.languages()
		.map((lang) => lang.split('-')[0]);

	const cookieValue = request.cookies.get(COOKIES.LOCALE)?.value;
	const locale =
		cookieValue && LOCALES.LIST.includes(cookieValue as TLocale)
			? cookieValue
			: (match(
					[...new Set(languages)],
					LOCALES.LIST,
					process.env.NEXT_PUBLIC_DEFAULT_LOCALE!
				) as unknown as TLocale);

	return locale;
}
