import { NextRequest, NextResponse } from 'next/server';
import { decode, verifyAuth } from '@/lib/jwt';
import { COOKIES } from '@nw/config';
import { cookies } from 'next/headers';
import { sessionCookie } from '@/utils/cookies';
import { USER_UNAUTHORIZED } from '@/constants/errorCodes';
import { parseError } from '@/utils';

const refreshCookie = async (refresh_token: string, session: string) => {
	const refreshPayload = await verifyAuth<{ uuid: string }>(refresh_token);
	const sessionPayload = decode<{ uuid: string }>(session);
	if (
		!sessionPayload ||
		!refreshPayload ||
		sessionPayload?.uuid !== refreshPayload?.uuid
	)
		return null;

	return sessionPayload;
};

export async function GET(request: NextRequest) {
	const refresh_token =
		request.cookies.get(COOKIES.REFRESH_TOKEN)?.value ||
		request.headers.get('Authorization')?.replace('Bearer ', '') ||
		'';
	const session = request.cookies.get(COOKIES.SESSION)?.value || '';

	const user = await refreshCookie(refresh_token, session);
	if (!user) {
		return NextResponse.json(
			{ error: parseError({ code: USER_UNAUTHORIZED }), success: false },
			{ status: 401 },
		);
	}

	cookies().set(sessionCookie(user));
	return NextResponse.json({ success: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
	const refresh_token =
		request.headers.get('Authorization')?.replace('Bearer ', '') || '';
	const session = (await request.text()) || '';

	const user = await refreshCookie(refresh_token, session);
	if (!user) {
		return NextResponse.json(
			{ error: parseError({ code: USER_UNAUTHORIZED }), success: false },
			{ status: 401 },
		);
	}

	const sessionData = sessionCookie(user);

	return NextResponse.json(
		{ success: true, session: sessionData },
		{ status: 200 },
	);
}
