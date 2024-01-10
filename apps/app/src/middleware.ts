import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
	cookies as cookiesConfig,
	headers as headersConfig,
	locales,
} from '@nw/config';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';
import { EnumDeviceType } from '@/enums';
import { API, APP } from '@/routes';
import { getSession, getRefreshToken } from '@/headers';

type LangType = typeof locales.LOCALES & undefined;

const getDevice = (userAgent: string | null | undefined) => {
	const ua = UAParser(userAgent || undefined);
	let device: EnumDeviceType = EnumDeviceType.NONE;
	switch (ua.device.type) {
		case 'mobile': {
			device = EnumDeviceType.MOBILE;
			break;
		}
		case 'tablet': {
			device = EnumDeviceType.TABLET;
			break;
		}
		default: {
			device = EnumDeviceType.DESKTOP;
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
	cookies: Array<{
		name: string;
		value: string | null | undefined;
		maxAge?: number;
		httpOnly?: boolean;
		secure?: boolean;
	}>,
) => {
	const setCookies = response.headers.get('set-cookie');
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
					.join('; '),
			)
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

	const response = NextResponse.next();

	setCookie(response, [
		{ name: cookiesConfig.DEVICE, value: device },
		{ name: cookiesConfig.DEVICE_INFO, value: info },
	]);

	if (cookieValue != locale) {
		setCookie(response, [
			{
				name: cookiesConfig.LOCALE,
				value: locale,
			},
		]);
	}

	if (pathname.startsWith(APP)) {
		try {
			const refreshResponse = await fetch(
				new URL(API.AUTH_REFRESH_TOKEN, request.nextUrl.origin),
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getRefreshToken()}`,
					},
					body: getSession(),
				},
			);
			const json = await refreshResponse.json();

			if (json.success && !!json.session && typeof json.session === 'object') {
				setCookie(response, [json.session]);
			}
		} catch (error) {
			console.error(error);
		}
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
