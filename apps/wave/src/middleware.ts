import { COOKIES, HEADERS } from '@nw/config';
import { NextRequest, NextResponse } from 'next/server';
import { computeLocale, computeDevice, updateCookie } from '~/utils/middleware';

/**
 * Custom middleware
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	if (/\.(!?json|xml|txt|js|css|ico|png|jpg|jpeg)$/.test(pathname))
		return NextResponse.next();

	const locale = computeLocale(request);
	const device = computeDevice(request);

	const response = NextResponse.next();

	updateCookie(response, [
		{ name: COOKIES.DEVICE, value: device },
		{ name: COOKIES.LOCALE, value: locale },
	]);

	response.headers.set(HEADERS.SEARCH_PARAMS, search);
	response.headers.set(HEADERS.PATHNAME, pathname);
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/((?!api|~offline|_next/static|_next/image|assets).*)'],
};
