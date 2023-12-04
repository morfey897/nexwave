import { getAuth } from '@/lib/firebase-admin';
import { SESSION_COOKIE, UID_COOKIE } from '@packages/config/dist';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
	const authorization = headers().get('Authorization');
	if (authorization?.startsWith('Bearer ')) {
		const auth = getAuth();
		const idToken = authorization.split('Bearer ')[1];
		const decodedToken = await auth.verifyIdToken(idToken);

		if (decodedToken) {
			//Generate session cookie
			const expiresIn = (60 - 5) * 60 * 1000;
			const sessionCookie = await auth.createSessionCookie(idToken, {
				expiresIn,
			});

			//Add the cookie to the browser
			cookies().set({
				name: SESSION_COOKIE,
				value: sessionCookie,
				maxAge: expiresIn,
				httpOnly: true,
				secure: true,
			});
			// Add the uid cookie to the browser
			cookies().set({
				name: UID_COOKIE,
				value: decodedToken.uid,
				httpOnly: true,
				secure: true,
			});
		}
	}

	return NextResponse.json({}, { status: 200 });
}
