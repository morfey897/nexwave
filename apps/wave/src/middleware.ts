import { COOKIES, HEADERS } from '@nw/config';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { EnumApiRoutes, EnumProtectedRoutes } from '~enums';
import { getSession, getRefreshToken } from '~utils/headers';
import { computeLocale, computeDevice, updateCookie } from '~utils/middleware';

/**
 * Custom middleware
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	if (/\.(!?json|xml|txt|js|css|ico|png|jpg|jpeg)$/.test(pathname))
		return NextResponse.next();

	console.log('middleware', pathname);

	const locale = computeLocale(request);
	const device = computeDevice(request);

	const response = NextResponse.next();

	updateCookie(response, [
		{ name: COOKIES.DEVICE, value: device },
		{ name: COOKIES.LOCALE, value: locale },
	]);

	// Refresh token on protected routes
	// TODO should add a check for the refresh token expiration
	if (pathname.startsWith(EnumProtectedRoutes.APP)) {
		console.log('refresh token', new URL(EnumApiRoutes.AUTH_REFRESH_TOKEN, request.nextUrl.origin));
		try {
			const session = getSession();
			const refresh_token = getRefreshToken();
			const refreshResponse = await fetch(
				new URL(EnumApiRoutes.AUTH_REFRESH_TOKEN, request.nextUrl.origin),
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${refresh_token}`,
					},
					body: session,
				}
			);
			const json = await refreshResponse.json();

			console.log('refreshed token', json);

			if (json.success && !!json.session && typeof json.session === 'object') {
				updateCookie(response, [json.session]);
			}
		} catch (error) {
			console.error(error);
		}
	}

	response.headers.set(HEADERS.SEARCH_PARAMS, search);
	response.headers.set(HEADERS.PATHNAME, pathname);
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/((?!api|~offline|_next/static|_next/image|assets).*)'],
};
