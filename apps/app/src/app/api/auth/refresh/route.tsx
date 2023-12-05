import { getAuth } from '@/lib/firebase-admin';
import { SESSION_COOKIE } from '@packages/config/dist';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
	const authorization = headers().get('Authorization');

	try {
		if (!authorization?.startsWith('Bearer ')) {
			throw new Error('Invalid token');
		}
		const auth = getAuth();
		const idToken = authorization.split('Bearer ')[1];
		const decodedToken = await auth.verifyIdToken(idToken);

		if (!decodedToken) {
			throw new Error('Token is not verified');
		}
		//Generate session cookie
		const expiresIn = (60 - 5) * 60;
		const sessionCookie = await auth.createSessionCookie(idToken, {
			expiresIn: expiresIn * 1000,
		});

		//Add the cookie to the browser
		cookies().set({
			name: SESSION_COOKIE,
			value: sessionCookie,
			maxAge: expiresIn,
			// expires:
			httpOnly: true,
			secure: true,
		});
		return NextResponse.json({ success: false }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 401 });
	}
}
