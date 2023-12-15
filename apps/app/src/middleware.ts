import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
	cookies as cookiesConfig,
	headers as headersConfig,
	locales
} from 'config';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';
import { EnumDevice } from './types/view';

type LangType = typeof locales.LOCALES & undefined;

const getDevice = (userAgent: string | null | undefined) => {
	const ua = UAParser(userAgent || undefined);
	let device: EnumDevice = EnumDevice.NONE;
	switch (ua.device.type) {
		case 'mobile': {
			device = EnumDevice.MOBILE;
			break;
		}
		case 'tablet': {
			device = EnumDevice.TABLET;
			break;
		}
		default: {
			device = EnumDevice.DESKTOP;
			break;
		}
	}
	return {
		device,
		info: JSON.stringify(ua),
	};
};

const setCookie = (
	response: NextResponse,
	cookie: Record<string, string | undefined>,
) => {
	const setCookies = response.headers.get('set-cookie');
	response.headers.set(
		'set-cookie',
		Object.entries(cookie)
			.filter(([key, value]) => Boolean(value) && Boolean(key))
			.map(([key, value]) => `${key}=${value};path=/`)
			.concat(setCookies || '')
			.filter((v) => Boolean(v))
			.join(','),
	);
};

function getLocale(request: NextRequest) {
	const headers = {
		'accept-language': request.headers.get('accept-language') || '',
	};
	const languages = new Negotiator({ headers })
		.languages()
		.map((lang) => lang.split('-')[0]);
	return match(
		[...new Set(languages)],
		locales.LOCALES,
		process.env.NEXT_PUBLIC_DEFAULT_LOCALE!,
	) as unknown as LangType;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (/\.(!?json|xml|txt|js|css|ico|png|jpg|jpeg)$/.test(pathname))
		return NextResponse.next();

	const cookieValue = request.cookies.get(cookiesConfig.LOCALE)?.value;
	const locale = locales.LOCALES.includes(cookieValue as LangType)
		? cookieValue
		: getLocale(request);

	const { device, info } = getDevice(request.headers.get('user-agent'));

	let response = NextResponse.next();

	setCookie(response, {
		[cookiesConfig.DEVICE]: device,
		[cookiesConfig.DEVICE_INFO]: info,
	});

	if (cookieValue != locale) {
		setCookie(response, { [cookiesConfig.LOCALE]: locale });
	}

	response.headers.set(headersConfig.PATHNAME, pathname);
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|~offline|_next/static|_next/image|assets).*)',
	],
};
