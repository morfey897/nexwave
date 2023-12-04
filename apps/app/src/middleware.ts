import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
	DEFAULT_LOCALE,
	LOCALES,
	LOCALE_COOKIE,
	DEVICE_COOKIE,
	DEVICE_INFO_COOKIE,
	PATHNAME_HEADER,
	SESSION_COOKIE,
	UID_COOKIE,
} from 'config';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';
import * as routes from '@/constants/routes';
import { EnumDevice } from './types/view';

type LangType = typeof LOCALES & undefined;

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
		LOCALES,
		DEFAULT_LOCALE,
	) as unknown as LangType;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (/\.(!?json|xml|txt|js|css|ico|png|jpg|jpeg)$/.test(pathname))
		return NextResponse.next();

	const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
	const locale = LOCALES.includes(cookieValue as LangType)
		? cookieValue
		: getLocale(request);

	const { device, info } = getDevice(request.headers.get('user-agent'));

	let response = NextResponse.next();

	setCookie(response, {
		[DEVICE_COOKIE]: device,
		[DEVICE_INFO_COOKIE]: info,
	});


	const uid = request.cookies.get(UID_COOKIE)?.value;
	const session = request.cookies.get(SESSION_COOKIE)?.value;
	const checkSession = session
		? await fetch(`${request.nextUrl.origin}${routes.API_AUTH}`, {
				headers: {
					Cookie: `${SESSION_COOKIE}=${session}`,
				},
		  })
		: { status: 401 };

	const isVerify = checkSession.status === 200;

	if (!isVerify && request.nextUrl.pathname.startsWith(routes.APP)) {
		response = NextResponse.redirect(
			new URL(
				!!uid ? routes.SIGN_IN : routes.SIGN_UP,
				request.nextUrl.href,
			),
			{
				status: 307,
			},
		);
	} else if (isVerify && request.nextUrl.pathname.startsWith(routes.AUTH)) {
		response = NextResponse.redirect(
			new URL(routes.APP, request.nextUrl.href),
			{
				status: 307,
			},
		);
	}

	if (cookieValue != locale) {
		setCookie(response, { [LOCALE_COOKIE]: locale });
	}

	response.headers.set(PATHNAME_HEADER, pathname);
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
