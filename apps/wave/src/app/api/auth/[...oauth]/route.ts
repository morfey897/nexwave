import { NextRequest, NextResponse } from 'next/server';
// import { verifyAuth } from '@/lib/jwt';
// import { HOME, APP } from '@/routes';
// import googleOAuthClient from '@/lib/googleOAuth';
// import { TokenPayload } from 'google-auth-library';
// import { cookies } from 'next/headers';
// import { trailCookie, sessionCookie, refreshCookie } from '@/utils/cookies';
// import * as users from '@/models/user';
// import { start } from '~/models/start';

// type Info = {
// 	email: string | null;
// 	emailVerified: boolean;
// 	name?: string;
// 	surname?: string;
// 	avatar?: string;
// };

// const getFullInfo = async (
// 	id_token: string | undefined | null
// ): Promise<Info | null> => {
// 	if (!id_token) return null;
// 	const info = await googleOAuthClient.verifyIdToken({
// 		idToken: id_token as string,
// 	});
// 	const payload = (info.getPayload() || {}) as TokenPayload;
// 	return {
// 		email: payload.email || null,
// 		emailVerified: payload.email_verified === true,
// 		name: payload.given_name,
// 		surname: payload.family_name,
// 		avatar: payload.picture,
// 	};
// };

// const getInfo = async (
// 	access_token: string | undefined | null
// ): Promise<Info | null> => {
// 	if (!access_token) return null;
// 	const tokenInfo = await googleOAuthClient.getTokenInfo(
// 		access_token as string
// 	);

// 	return {
// 		email: tokenInfo.email || null,
// 		emailVerified: tokenInfo.email_verified === true,
// 	};
// };

export async function GET(request: NextRequest) {
	// const pathname = request.nextUrl.pathname.replace(/\/$/, '');
	// if (/\/google?$/.test(pathname)) {
	// 	const code = request.nextUrl.searchParams.get('code') || '';
	// 	const state = request.nextUrl.searchParams.get('state') || '';
	// 	const payload = await verifyAuth<{ state: string; redirect_uri?: string }>(
	// 		state || '',
	// 	);
	// 	if (!payload || payload.state != 'log_in' || !code)
	// 		NextResponse.redirect(new URL(HOME, request.nextUrl));
	// 	const {
	// 		tokens: { id_token, access_token },
	// 	} = await googleOAuthClient.getToken({
	// 		code,
	// 		redirect_uri: request.nextUrl.origin + pathname,
	// 	});
	// 	const fullInfo =
	// 		(await getFullInfo(id_token)) || (await getInfo(access_token));
	// 	if (!fullInfo || !fullInfo.email) {
	// 		// TODO redirect to error sign in page
	// 		return NextResponse.redirect(new URL(HOME, request.nextUrl));
	// 	} else {
	// 		let response: Awaited<ReturnType<typeof start>>;
	// 		let user = await users.getUser({
	// 			email: fullInfo.email,
	// 			password: null,
	// 		});
	// 		if (!user) {
	// 			response = await start({
	// 				email: fullInfo.email,
	// 				emailVerified: fullInfo.emailVerified,
	// 				name: fullInfo.name,
	// 				surname: fullInfo.surname,
	// 				avatar: fullInfo.avatar,
	// 				password: null,
	// 			});
	// 			user = response.user;
	// 		}

	// 		if (!user) {
	// 			// TODO redirect to error sign in page
	// 			return NextResponse.redirect(new URL(HOME, request.nextUrl));
	// 		}
	// 		await users.updateUser(user.uuid, { lastLoginAt: new Date() });
	// 		cookies().set(sessionCookie(user));
	// 		cookies().set(trailCookie('1'));
	// 		cookies().set(refreshCookie(user));
	// 		//if response.project is null, then redirect to invitations page
	// 		//if response.project is not null, then redirect to project page
	// 		return NextResponse.redirect(
	// 			new URL(payload?.redirect_uri || APP, request.nextUrl),
	// 		);
	// 	}
	// }

	return NextResponse.json({ error: 'Invalid method' }, { status: 404 });
}
