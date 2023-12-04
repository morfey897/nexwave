import { getAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from 'config';

export async function GET(request: NextRequest) {
	const auth = getAuth();
	const session = cookies().get(SESSION_COOKIE)?.value || '';

	//Validate if the cookie exist in the request
	if (!session) {
		return NextResponse.json({ isLogged: false }, { status: 401 });
	}

	try {
		//Use Firebase Admin to validate the session cookie
		const decodedClaims = await auth.verifySessionCookie(session, true);
		if (!decodedClaims) {
			throw new Error('Invalid session');
		}

		return NextResponse.json({ isLogged: true }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ isLogged: false }, { status: 401 });
	}
}
